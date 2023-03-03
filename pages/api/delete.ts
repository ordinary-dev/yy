import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check request method
        if (req.method !== "DELETE") throw new Error("Wrong request method")

        // Check auth
        const user = req.session.user
        if (!user) throw new Error("You are not authorized")

        // Check body
        if (!req.body.id) throw new Error("Please provide photo id")

        // Delete post
        const deletedPhoto = await prisma.photo.delete({
            where: {
                id: req.body.id,
            },
        })
        if (!deletedPhoto) throw new Error("Cannot delete photo")

        res.status(204).send({})
    } catch {
        res.status(400).send({})
    }
}
