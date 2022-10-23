import { NextApiRequest, NextApiResponse } from "next"
import { Photo } from "@prisma/client"
import { prisma } from "lib/prisma"
import { getErrorMessage } from "lib/error"

export type ArtistPageGoodResponse = {
    photos: Photo[]
}

type ArtistPageBadResponse = {
    msg: string
}

type ArtistPageAPI = ArtistPageGoodResponse | ArtistPageBadResponse

const handle = async (
    req: NextApiRequest,
    res: NextApiResponse<ArtistPageAPI>
) => {
    try {
        if (!req.query.role || !req.query.name)
            throw new Error("Please provide role and name")
        const role = req.query.role.toString()
        const name = req.query.name.toString()
        const photos = await prisma.photo.findMany({
            where: {
                artists: {
                    some: {
                        person: {
                            url: name,
                        },
                        role: {
                            url: role,
                        },
                    },
                },
            },
            orderBy: {
                order: "asc"
            }
        })
        if (photos === undefined) throw new Error("Can't find photos")
        res.status(200).json({ photos })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

export default handle
