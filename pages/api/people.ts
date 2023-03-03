import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Person } from "@prisma/client"
import { prisma } from "lib/prisma"
import { getErrorMessage } from "lib/error"
import { sessionOptions } from "lib/session"
import { toUrl } from "lib/url"

// Person API.
// Avaiable methods: GET, POST, PUT, DELETE.

export type PersonBadResponse = { error: string }
export type PersonGetResponse = Person[] | PersonBadResponse
export type PersonPostResponse = Person | PersonBadResponse
export type PersonPutResponse = Person | PersonBadResponse
export type PersonDeleteResponse = {} | PersonBadResponse
export type PersonAPI = PersonGetResponse | PersonPostResponse | PersonPutResponse | PersonDeleteResponse

// Check authorization (but don't require it)
export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

async function parseRequestMethod(req: NextApiRequest, res: NextApiResponse<PersonAPI>) {
    if (req.method === "GET") await getPeople(res)
    else if (req.method === "POST") await createPerson(req, res)
    else if (req.method === "PUT") await updatePerson(req, res)
    else if (req.method === "DELETE") await deletePerson(req, res)
    else res.status(405).json({ error: "Method not avaiable" })
}

// GET request
const getPeople = async (res: NextApiResponse<PersonGetResponse>) => {
    try {
        const people = await prisma.person.findMany({})
        if (people === undefined) throw new Error("Can't find people")
        res.status(200).json(people)
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}

// POST request
async function createPerson(req: NextApiRequest, res: NextApiResponse<PersonPostResponse>) {
    try {
        // Check request
        if (!req.session.user) {
            res.status(403).json({ error: "Forbidden" })
            return
        }
        if (!req.body.nameEn || !req.body.nameRu) {
            res.status(400).json({
                error: "Please provide person name in english and russian (nameEn and nameRu)"
            })
            return
        }

        // Create person
        const newPerson = await prisma.person.create({
            data: {
                nameEn: req.body.nameEn,
                nameRu: req.body.nameRu,
                url: toUrl(req.body.nameEn),
            },
        })
        if (newPerson === undefined) throw new Error("Can't create new person")

        res.status(201).json(newPerson)
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}

// PUT request
async function updatePerson(req: NextApiRequest, res: NextApiResponse<PersonPutResponse>) {
    try {
        // Check request
        if (!req.session.user) {
            res.status(403).json({ error: "Forbidden" })
            return
        }
        if (!req.body.id) {
            res.status(400).json({ error: "Please provide person id" })
            return
        }
        if (!req.body.nameEn || !req.body.nameRu) {
            res.status(400).json({
                error: "Please provide person name in english and russian (nameEn and nameRu)"
            })
            return
        }

        // Update person
        const updatedPerson = await prisma.person.update({
            where: {
                id: req.body.id,
            },
            data: {
                nameEn: req.body.nameEn,
                nameRu: req.body.nameRu,
                url: toUrl(req.body.nameEn),
            },
        })
        if (updatedPerson === undefined) throw new Error("Can't update person")

        res.status(200).json(updatedPerson)
    } catch(err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}

// DELETE request
async function deletePerson(req: NextApiRequest, res: NextApiResponse<PersonDeleteResponse>) {
    try {
        // Check request
        if (!req.session.user) {
            res.status(403).json({ error: "Forbidden" })
            return
        }
        if (!req.body.id) {
            res.status(400).json({ error: "Please provide person id" })
            return
        }

        // Delete person
        const deletedPerson = await prisma.person.delete({
            where: {
                id: req.body.id,
            },
        })
        if (deletedPerson === undefined) throw new Error("Can't delete person")

        res.status(204).json({})
    } catch(err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}
