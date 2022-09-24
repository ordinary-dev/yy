import type { IronSessionOptions } from "iron-session"

const getPass = () => {
    const pass = process.env.COOKIE_PASS
    if (!pass) throw new Error("Server is misconfigured")
    return pass
}

export const sessionOptions: IronSessionOptions = {
  password: getPass(),
  cookieName: "yy-auth",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
}

// This is where we specify the typings of req.session.*
declare module "iron-session" {
  interface IronSessionData {
    user?: User;
  }
}

type User = {
    isAdmin: boolean
}
