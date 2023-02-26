import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"
import { getSalt, getHash } from "lib/password"

export default withIronSessionApiRoute(loginAPI, sessionOptions)

async function loginAPI(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.body.login) throw new Error("Please provide login")
        if (!req.body.password) throw new Error("Plase provide password")

        // Check login and password
        const profile = await prisma.admin.findUnique({
            where: {
                login: req.body.login,
            },
        })
        
        // Profile with this login was not found
        if (!profile) {
            // Throw an error if at least 1 account exists
            const profileCount = await prisma.admin.count()
            if (profileCount !== 0) throw new Error("Wrong login or password")

            // Create default profile
            const login = "yy"
            const password = "123456"
            const salt = getSalt()
            const hash = getHash(password, salt)
            const newProfile = await prisma.admin.create({
                data: {
                    login: login,
                    salt: salt,
                    hash: hash,
                },
            })
            if (!newProfile) throw new Error("Can't create default profile")

            // Check login and password
            if (login !== req.body.login)
                throw new Error("Wrong login or password")
            if (hash !== getHash(req.body.password, salt))
                throw new Error("Wrong login or password")
        } else if (profile.hash !== getHash(req.body.password, profile.salt)) {
            throw new Error("Wrong login or password")
        }

        // Authorize user
        req.session.user = {
            login: req.body.login,
        }
        await req.session.save()
        res.status(200).send({})
    } catch {
        res.status(400).send({})
    }
}
