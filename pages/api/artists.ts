import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Person, Role } from "@prisma/client"
import { prisma } from "lib/prisma"
import { sessionOptions } from "lib/session"
import { getErrorMessage } from "lib/error"

// An artist is a record of how a person is related to a particular photo.
// Allowed methods: GET, POST, DELETE.

export type ArtistWithExtras = {
    id: number
    person: Person
    role: Role
}

export type ArtistsAPIGoodResponse = {
    artists: ArtistWithExtras[]
}

type BadResponse = {
    msg: string
}

type ArtistsAPI = ArtistsAPIGoodResponse | BadResponse

// Check authorization (but don't require it)
export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

async function parseRequestMethod(
    req: NextApiRequest,
    res: NextApiResponse<ArtistsAPI>
) {
    if (req.method === "GET") await getArtists(res)
    else if (req.method === "POST") await createArtist(req, res)
    else if (req.method === "DELETE") await deleteArtist(req, res)
    else res.status(405).json({ msg: "Method not allowed" })
}

// GET request
const getArtists = async (res: NextApiResponse<ArtistsAPI>) => {
    try {
        const artists = await prisma.artist.findMany({
            select: {
                id: true,
                role: true,
                person: true,
            },
        })
        if (artists === undefined) throw new Error("Can't find artists")
        res.status(200).json({ artists })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

// POST request
const createArtist = async (
    req: NextApiRequest,
    res: NextApiResponse<ArtistsAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.roleId || !req.body.personId || !req.body.photoId)
            throw new Error("Please provide personId, photoId and roleId")

        // Create new artist
        const artist = await prisma.artist.create({
            data: {
                photo: {
                    connect: {
                        id: req.body.photoId,
                    },
                },
                role: {
                    connect: {
                        id: req.body.roleId,
                    },
                },
                person: {
                    connect: {
                        id: req.body.personId,
                    },
                },
            },
            include: {
                role: true,
                person: true,
            },
        })
        if (artist === undefined) throw new Error("Can't create an artist")

        // Send response
        res.status(200).json({ artists: [artist] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

// DELETE request
const deleteArtist = async (
    req: NextApiRequest,
    res: NextApiResponse<ArtistsAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.artistId) throw new Error("Please provide artist id")

        // Delete artist
        const deletedArtist = await prisma.artist.delete({
            where: {
                id: req.body.artistId,
            },
            include: {
                person: true,
                role: true,
            },
        })
        if (deletedArtist === undefined)
            throw new Error("Can't delete an artist")

        // Send response
        res.status(200).json({ artists: [deletedArtist] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
