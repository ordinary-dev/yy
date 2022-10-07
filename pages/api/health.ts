import { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "lib/prisma"

type HealthAPI = {
    ok: boolean
    msg?: string
}

const handle = async (
    _req: NextApiRequest,
    res: NextApiResponse<HealthAPI>
) => {
    try {
        // Test prisma
        const photo = await prisma.photo.findFirst({})
        if (!photo) throw new Error("Can't get photo from db")

        res.status(200).send({ ok: true })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(500).send({ ok: false, msg: msg })
    }
}

export default handle
