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

export type RoleBadResponse = { error: string }
export type RoleGetResponse = Role[] | RoleBadResponse
export type RolePostResponse = Role | RoleBadResponse
export type RolePutResponse = Role | RoleBadResponse
export type RoleDeleteResponse = {} | RoleBadResponse
export type RoleAPI = RoleGetResponse | RolePostResponse | RolePutResponse | RoleDeleteResponse

// Check authorization (but don't require it)
export default withIronSessionApiRoute(parseRequestMethod, sessionOptions)

async function parseRequestMethod(req: NextApiRequest, res: NextApiResponse<RoleAPI>) {
    if (req.method === "GET") await getRoles(res)
    else if (req.method === "POST") await createRole(req, res)
    else if (req.method === "PUT") await updateRole(req, res)
    else if (req.method === "DELETE") await deleteRole(req, res)
    else res.status(405).json({ error: "Method not allowed" })
}

// GET request
const getRoles = async (res: NextApiResponse<RoleGetResponse>) => {
    try {
        const roles = await prisma.role.findMany({})
        if (roles === undefined) throw new Error("Can't find roles")
        res.status(200).json(roles)
    } catch(err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}

// POST request
async function createRole(req: NextApiRequest, res: NextApiResponse<RolePostResponse>) {
    try {
        // Check request
        if (!req.session.user) {
            res.status(401).json({ error: "Unauthorized" })
            return
        }
        if (!req.body.nameEn || !req.body.nameRu) {
            res.status(400).json({
                error: "Please provide role name in english and russian (nameEn and nameRu)"
            })
            return
        }

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
        res.status(200).json(newRole)
    } catch(err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}

// PUT request
async function updateRole(req: NextApiRequest, res: NextApiResponse<RolePutResponse>) {
    try {
        // Check request
        if (!req.session.user) {
            res.status(403).json({ error: "Forbidden" })
            return
        }
        if (!req.body.id) {
            res.status(400).json({ error: "Please provide role id" })
            return
        }
        if (!req.body.nameEn || !req.body.nameRu) {
            res.status(400).json({ error: "Please provide role name" })
            return
        }

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
        res.status(200).json(updatedRole)
    } catch(err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}
// DELETE request
async function deleteRole(req: NextApiRequest, res: NextApiResponse<RoleDeleteResponse>) {
    try {
        // Check request
        if (!req.session.user) {
            res.status(403).json({ msg: "Forbidden" })
            return
        }
        if (!req.body.id) {
            res.status(400).json({ error: "Please provide role id" })
        }

        // Delete role
        const deletedRole = await prisma.role.delete({
            where: {
                id: req.body.id,
            },
        })
        if (deletedRole === undefined) throw new Error("Can't delete role")

        // Send response
        res.status(200).json({})
    } catch(err) {
        const msg = getErrorMessage(err)
        res.status(500).json({ error: msg })
    }
}
