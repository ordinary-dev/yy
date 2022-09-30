import { withIronSessionApiRoute } from 'iron-session/next'
import { NextApiRequest, NextApiResponse } from 'next'
import { sessionOptions } from '../../lib/session'
import { prisma } from '../../lib/prisma'
import { getSalt, getHash } from '../../lib/password'

export default withIronSessionApiRoute(loginAPI, sessionOptions)

async function loginAPI(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (!req.body.login) throw new Error("Please provide login")
        if (!req.body.password) throw new Error("Plase provide password")
        
        // Check login and password
        const profile = await prisma.admin.findUnique({
            where: {
                login: req.body.login
            }
        })
        if (!profile) {
            // Check if we have at least 1 account
            // and create default profile otherwise
            const profileCount = await prisma.admin.count()
            if (profileCount === 0) {
                const login = 'yy'
                const password = '123456'
                const salt = getSalt()
                const hash = getHash(password, salt)
                const newProfile = await prisma.admin.create({
                    data: {
                        login: login,
                        salt: salt,
                        hash: hash,
                    }
                })
                if (!newProfile) throw new Error("Can't create default profile")
                if (login !== req.body.login) throw new Error("Wrong login or password")
                if (hash !== getHash(req.body.password, salt)) throw new Error("Wrong login or password")
            }
            // At least 1 account exists
            else throw new Error("Wrong login or password")
        }
        else if (profile.hash !== getHash(req.body.password, profile.salt)) {
            throw new Error("Wrong login or password")
        }

        // Authorize user
        req.session.user = {
            login: req.body.login,
        };
        await req.session.save()
        res.send({ ok: true })
    }
    catch {
        res.status(400).send({ ok: false })
    }
}
