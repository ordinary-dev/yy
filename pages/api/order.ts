import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"
import { getErrorMessage } from "lib/error"

export default withIronSessionApiRoute(reorder, sessionOptions)

// Changes the photo order.
// Request method: PUT.
// Expected body: {
//   id: number (the id of the photo whose order you want to change),
//   order: number (new order for this photo)
// }
async function reorder(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check request
        if (req.method !== "PUT") {
            res.status(405).json({ msg: "Method not supported" })
            return
        }
        if (req.body.id === undefined || req.body.order === undefined)
            throw new Error("Please provide photo id and new order")

        if (!req.session.user) throw new Error("You are not authorized")

        // Find photos
        const selectedPhoto = await prisma.photo.findUnique({
            where: {
                id: req.body.id,
            },
        })
        if (!selectedPhoto) throw new Error("Can't find photo")

        if (selectedPhoto.order === req.body.order)
            throw new Error("There is nothing to change")

        const interferingPhoto = await prisma.photo.findFirst({
            where: {
                order:
                    selectedPhoto.order > req.body.order
                        ? {
                              lt: selectedPhoto.order,
                          }
                        : {
                              gt: selectedPhoto.order,
                          },
            },
            orderBy: {
                order: selectedPhoto.order > req.body.order ? "desc" : "asc",
            },
        })
        if (!interferingPhoto) throw new Error("Can't find interfering photo")

        // Change their order
        const nonInterferingPhoto = await prisma.photo.update({
            where: {
                id: interferingPhoto.id,
            },
            data: {
                order: selectedPhoto.order,
            },
        })
        if (!nonInterferingPhoto)
            throw new Error("Can't change interfering photo")

        const updatedPhoto = await prisma.photo.update({
            where: {
                id: req.body.id,
            },
            data: {
                order: req.body.order,
            },
        })
        if (!updatedPhoto) throw new Error("Can't change your photo")

        res.status(200).json({ photo: updatedPhoto })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
