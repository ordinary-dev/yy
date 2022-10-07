import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"

import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"

export type UpdateAPI = {
    ok: boolean
    msg?: string
}

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse<UpdateAPI>) {
    try {
        // Check request method
        if (req.method !== "POST") throw new Error("Wrong request method")

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

        res.send({ ok: true })
    } catch (err) {
        const msg =
            err instanceof Error ? err.message : "/api/update: Unknown error"
        res.send({ ok: false, msg: msg })
    }
}
