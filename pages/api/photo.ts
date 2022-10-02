import { NextApiRequest, NextApiResponse } from "next"

import { prisma } from "lib/prisma"

const handle = async (_req: NextApiRequest, res: NextApiResponse) => {
    const photos = await prisma.photo.findMany({})
    if (!photos) res.send({ photos: [] })
    else res.send({ photos })
}

export default handle
