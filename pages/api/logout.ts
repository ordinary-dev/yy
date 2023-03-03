import { withIronSessionApiRoute } from "iron-session/next"
import { NextApiRequest, NextApiResponse } from "next"
import { sessionOptions } from "lib/session"


async function handle(req: NextApiRequest, res: NextApiResponse) {
    if (req.session.user) {
        req.session.destroy()
        res.status(200).send({})
    } else {
        res.status(403).send({})
    }
}

export default withIronSessionApiRoute(handle, sessionOptions)
