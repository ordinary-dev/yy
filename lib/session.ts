import { prisma } from './prisma'
import { randomBytes } from 'crypto'

const getPass = async() => {
    const pass = await prisma.cookiePassword.findFirst({
        orderBy: {
            createdAt: 'desc'
        }
    })
    // Password was requested for the first time
    if (!pass) {
        const newPass = await prisma.cookiePassword.create({
            data: {
                value: randomBytes(20).toString('hex')
            }
        })
        if (!newPass) throw new Error("Can't generate password for cookie")
        return newPass.value
    }
    return pass.value
}

export const sessionOptions = async() => {
    return {
        password: await getPass(),
        cookieName: "yy-auth",
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        }
    }
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
    interface IronSessionData {
        user?: User;
    }
}

type User = {
    login: string
}
