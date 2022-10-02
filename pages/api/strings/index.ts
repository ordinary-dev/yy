import { NextApiRequest, NextApiResponse } from 'next'
import { withIronSessionApiRoute } from 'iron-session/next'

import { prisma } from 'lib/prisma'
import { sessionOptions } from 'lib/session'

export default withIronSessionApiRoute(
    async function(req, res) {
        if (req.method === 'GET') await handleGetMethod(res)
        else if (req.method === 'POST') await handlePostMethod(req, res)
        else if (req.method === 'PUT') await handlePutMethod(req, res)
        else if (req.method === 'DELETE') await handleDeleteMethod(req, res)
        else res.send({ ok: false })
    },
    sessionOptions
)

const handleGetMethod = async(res: NextApiResponse) => {
    const strings = await prisma.text.findMany({
        orderBy: {
            id: 'asc'
        }
    })
    if (!strings) res.send({ strings: [] })
    else res.send({ strings })
}

const handlePostMethod = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.body.id) throw new Error("Provide string id")
        if (!req.body.value) throw new Error("Provide string value")

        const newRecord = await prisma.text.create({
            data: {
                id: req.body.id,
                value: req.body.value
            }
        })

        if (!newRecord) throw new Error("Can't create new record")
        res.send({ ok: true })
    }
    catch {
        res.send({ ok: false })
    }
}

const handlePutMethod = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.body.id) throw new Error("Provide string id")
        if (!req.body.value) throw new Error("Provide string value")

        const updatedRecord = await prisma.text.update({
            where: {
                id: req.body.id
            },
            data: {
                value: req.body.value
            }
        })

        if (!updatedRecord) throw new Error("Can't update record")
        res.send({ ok: true })

    }
    catch {
        res.send({ ok: false })
    }
}

const handleDeleteMethod = async(req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (!req.body.id) throw new Error("Provide string id")

        const deletedRecord = await prisma.text.delete({
            where: {
                id: req.body.id
            }
        })

        if (!deletedRecord) throw new Error("Can't delete record")
        res.send({ ok: true })

    }
    catch {
        res.send({ ok: false })
    }
}
