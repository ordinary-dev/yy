import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"
import { getErrorMessage } from "lib/error"

export default withIronSessionApiRoute(changeVisibility, sessionOptions)

// Changes visibility.
// Request method: PUT.
// Expected body: {
//   id: number (the id of the photo whose order you want to change),
//   visibility: boolean
// }
async function changeVisibility(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check request
        if (req.method !== "PUT") {
            res.status(405).json({ msg: "Method not supported" })
            return
        }
        if (req.body.id === undefined || req.body.visibility === undefined)
            throw new Error("Please provide photo id and visibility")

        if (!req.session.user) throw new Error("You are not authorized")

        // Update visibility
        const newPhoto = await prisma.photo.update({
            where: {
                id: req.body.id,
            },
            data: {
                visibleOnHomepage: req.body.visibility,
            },
        })
        if (!newPhoto) throw new Error("Can't update photo")

        res.status(200).json({ photo: newPhoto })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
