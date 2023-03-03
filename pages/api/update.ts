import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"

import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check request method
        if (req.method !== "PUT") throw new Error("Wrong request method")

        // Check auth
        const user = req.session.user
        if (!user) throw new Error("You are not authorized")

        // Check body
        if (!req.body.id) throw new Error("Please provide photo id")

        // Delete post
        const descriptionRu = req.body.descRu ? req.body.descRu : undefined
        const descriptionEn = req.body.descEn ? req.body.descEn : undefined

        const updatedPhoto = await prisma.photo.update({
            where: {
                id: req.body.id,
            },
            data: {
                descriptionEn,
                descriptionRu,
            },
        })
        if (!updatedPhoto) throw new Error("Cannot update photo")

        res.status(200).send({})
    } catch {
        res.status(400).send({})
    }
}
