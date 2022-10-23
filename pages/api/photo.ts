import { NextApiRequest, NextApiResponse } from "next"
import { Photo, Artist, Role, Person } from "@prisma/client"

import { prisma } from "lib/prisma"

export type PhotoAPI = {
    photos: MyPhoto[]
}

type MyPhoto = Photo & {
    artists: MyArtist[]
}

type MyArtist = Artist & {
    role: Role
    person: Person
}

const handle = async (_req: NextApiRequest, res: NextApiResponse<PhotoAPI>) => {
    const photos = await prisma.photo.findMany({
        include: {
            artists: {
                include: {
                    role: true,
                    person: true,
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    })
    if (photos === undefined) throw new Error("Can't get photos")

    res.send({ photos })
}

export default handle
