import { NextApiRequest, NextApiResponse } from "next"
import { withIronSessionApiRoute } from "iron-session/next"
import { Role } from "@prisma/client"
import { prisma } from "lib/prisma"
import { sessionOptions } from "lib/session"
import { getErrorMessage } from "lib/error"
import { toUrl } from "lib/url"

// A role is a person's position when creating a photo.
// For example: a photographer or a stylist.

// Allowed methods: GET, POST, PUT, DELETE

export type RolesAPI = {
    roles?: Role[]
    msg?: string
}

// Check authorization (but don't require it)
export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

async function parseRequestMethod(
    req: NextApiRequest,
    res: NextApiResponse<RolesAPI>
) {
    if (req.method === "GET") await getRoles(res)
    else if (req.method === "POST") await createRole(req, res)
    else if (req.method === "PUT") await updateRole(req, res)
    else if (req.method === "DELETE") await deleteRole(req, res)
    else res.status(405).json({ msg: "Method not allowed" })
}

// GET request
const getRoles = async (res: NextApiResponse<RolesAPI>) => {
    try {
        const roles = await prisma.role.findMany({})
        if (roles === undefined) throw new Error("Can't find roles")
        res.status(200).json({ roles })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

// POST request
const createRole = async (
    req: NextApiRequest,
    res: NextApiResponse<RolesAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.nameEn || !req.body.nameRu)
            throw new Error(
                "Please provide role name in english and russian (nameEn and nameRu)"
            )

        // Create new role
        const newRole = await prisma.role.create({
            data: {
                nameEn: req.body.nameEn,
                nameRu: req.body.nameRu,
                url: toUrl(req.body.nameEn),
            },
        })
        if (newRole === undefined) throw new Error("Can't create new role")

        // Send response
        res.status(200).json({ roles: [newRole] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}

// PUT request
const updateRole = async (
    req: NextApiRequest,
    res: NextApiResponse<RolesAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.id) throw new Error("Please provide role id")
        if (!req.body.nameEn || !req.body.nameRu)
            throw new Error("Please provide role name")

        // Update role
        const updatedRole = await prisma.role.update({
            where: {
                id: req.body.id,
            },
            data: {
                nameEn: req.body.nameEn,
                nameRu: req.body.nameRu,
                url: toUrl(req.body.nameEn),
            },
        })
        if (updatedRole === undefined) throw new Error("Can't update role")

        // Send response
        res.status(200).json({ roles: [updatedRole] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
// DELETE request
const deleteRole = async (
    req: NextApiRequest,
    res: NextApiResponse<RolesAPI>
) => {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ msg: "Unauthorized" })
            return
        }
        if (!req.body.id) throw new Error("Please provide role id")

        // Delete role
        const deletedRole = await prisma.role.delete({
            where: {
                id: req.body.id,
            },
        })
        if (deletedRole === undefined) throw new Error("Can't delete role")

        // Send response
        res.status(200).json({ roles: [deletedRole] })
    } catch (err) {
        const msg = getErrorMessage(err)
        res.status(400).json({ msg })
    }
}
