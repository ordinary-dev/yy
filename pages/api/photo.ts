import { NextApiRequest, NextApiResponse } from "next"
import { Photo } from "@prisma/client"

import { prisma } from "lib/prisma"

export type PhotoAPI = {
    photos: Photo[]
}

const handle = async (_req: NextApiRequest, res: NextApiResponse<PhotoAPI>) => {
    const photos = await prisma.photo.findMany({})
    if (!photos) res.send({ photos: [] })
    else res.send({ photos })
}

export default handle
