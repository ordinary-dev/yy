import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"

import { sessionOptions } from "lib/session"

export type LogoutAPI = {
    ok: boolean
    msg?: string
}

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse<LogoutAPI>) {
    if (req.session.user) {
        req.session.destroy()
        res.send({ ok: true })
    } else {
        res.send({ ok: true, msg: "You are not authorized, nothing changed" })
    }
}
