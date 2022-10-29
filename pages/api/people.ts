import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Person } from "@prisma/client"
import { prisma } from "lib/prisma"
import { sessionOptions } from "lib/session"
import { getErrorMessage } from "lib/error"
import { toUrl } from "lib/url"

// Person API.
// Avaiable methods: GET, POST, PUT, DELETE.

export type PeopleAPI = {
    people?: Person[]
    msg?: string
}

// Check authorization (but don't require it)
export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

async function parseRequestMethod(
    req: NextApiRequest,
    res: NextApiResponse<PeopleAPI>
) {
    if (req.method === "GET") await getPeople(res)
    else if (req.method === "POST") await createPerson(req, res)
    else if (req.method === "PUT") await updatePerson(req, res)
    else if (req.method === "DELETE") await deletePerson(req, res)
    else res.status(405).json({ msg: "Method not avaiable" })
}

// GET request
const getPeople = async (res: NextApiResponse<PeopleAPI>) => {
    try {
        const people = await prisma.person.findMany({})
        if (people === undefined) throw new Error("Can't find people")
        res.status(200).json({ people })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

// POST request
const createPerson = async (
    req: NextApiRequest,
    res: NextApiResponse<PeopleAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.nameEn || !req.body.nameRu)
            throw new Error(
                "Please provide person name in english and russian (nameEn and nameRu)"
            )

        // Create person
        const newPerson = await prisma.person.create({
            data: {
                nameEn: req.body.nameEn,
                nameRu: req.body.nameRu,
                url: toUrl(req.body.nameEn),
            },
        })
        if (newPerson === undefined) throw new Error("Can't create new person")

        // Send response
        res.status(200).json({ people: [newPerson] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

// PUT request
const updatePerson = async (
    req: NextApiRequest,
    res: NextApiResponse<PeopleAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.id) throw new Error("Please provide person id")
        if (!req.body.nameEn || !req.body.nameRu)
            throw new Error(
                "Please provide person name in english and russian (nameEn and nameRu)"
            )

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

        // Send response
        res.status(200).json({ people: [updatedPerson] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

// DELETE request
const deletePerson = async (
    req: NextApiRequest,
    res: NextApiResponse<PeopleAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.id) throw new Error("Please provide person id")

        // Delete person
        const deletedPerson = await prisma.person.delete({
            where: {
                id: req.body.id,
            },
        })
        if (deletedPerson === undefined) throw new Error("Can't delete person")

        // Send response
        res.status(200).json({ people: [deletedPerson] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
