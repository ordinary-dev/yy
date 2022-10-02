import { NextApiRequest, NextApiResponse } from 'next'

import { prisma } from 'lib/prisma'

const handle = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.query.stringId) throw new Error("Provide string id")
        const record = await prisma.text.findUnique({
            where: {
                id: req.query.stringId.toString()
            }
        })
        if (!record) throw new Error("Record doesn't exist")
        res.send({ record })
    }
    catch {
        res.status(400).send({ ok: false })
    }
}

export default handle
