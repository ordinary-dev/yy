import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"
import { getHash } from "lib/password"

async function handle(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Check request method
        if (req.method !== "PUT") throw new Error("Wrong request method")

        // Check auth
        const user = req.session.user
        if (!user) throw new Error("You are not authorized")

        // Check body
        if (!req.body.oldPassword)
            throw new Error("Please provide old password")
        if (!req.body.newPassword)
            throw new Error("Please provide new password")

        // Get profile
        const profile = await prisma.admin.findUnique({
            where: {
                login: user.login,
            },
        })
        if (!profile) throw new Error("Can't find your profile")

        // Check password
        if (profile.hash !== getHash(req.body.oldPassword, profile.salt))
            throw new Error("Wrong password")

        // Update password
        const updatedProfile = await prisma.admin.update({
            where: {
                login: user.login,
            },
            data: {
                hash: getHash(req.body.newPassword, profile.salt),
            },
        })
        if (!updatedProfile) throw new Error("Cannot update password")

        res.status(200).send({})
    } catch {
        res.status(400).send({})
    }
}

export default withIronSessionApiRoute(handle, sessionOptions)
