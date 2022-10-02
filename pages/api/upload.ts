import { NextApiRequest, NextApiResponse } from "next"
import { IncomingForm, Files, File } from "formidable"
import { withIronSessionApiRoute } from "iron-session/next"
import fs from "fs"
import sharp from "sharp"

import { sessionOptions } from "lib/session"
import { prisma } from "lib/prisma"

// disable the default body parser
export const config = {
    api: {
        bodyParser: false,
    },
}

type MyResponse = {
    ok: boolean
    message: string
}

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse<MyResponse>) {
    try {
        // Check request method
        if (req.method !== "POST") throw new Error("Wrong request method")

        // Check auth
        const user = req.session.user
        if (!user) throw new Error("You are not authorized")

        // Parse form
        const form = new IncomingForm()
        const files = await new Promise<Files>((resolve, reject) => {
            form.parse(req, (err, _fields, files) => {
                if (err) reject(err)
                else resolve(files)
            })
        })

        const imageFile = isFileArray(files.image)
            ? files.image[0]
            : files.image

        // Create folder structure
        const ext = getExtensionFromMimeType(imageFile)
        if (!ext) throw new Error("Wrong mime type")

        // Get metadata
        const meta = await sharp(imageFile.filepath).metadata()
        if (!meta.height || !meta.width) throw new Error("Cannot get metadata")

        // Save photo
        const photo = await prisma.photo.create({
            data: {
                ext: ext,
                width: meta.width,
                height: meta.height,
            },
        })
        if (!photo) throw new Error("Cannot save photo")
        const imageDir = `photos/${photo.id}`
        if (!fs.existsSync(imageDir)) {
            await fs.promises.mkdir(imageDir, { recursive: true })
        }

        // Write file
        const imageWritePath = `${imageDir}/original.${ext}`
        const image = await fs.promises.readFile(imageFile.filepath)
        await fs.promises.writeFile(imageWritePath, image)

        res.status(200).json({ ok: true, message: "ok" })
    } catch (err) {
        const msg =
            err instanceof Error && err.message ? err.message : "Unknown error"
        res.status(400).json({ ok: false, message: msg })
    }
}

const isFileArray = (fa: unknown): fa is Array<File> => {
    return Array.isArray(fa)
}

const getExtensionFromMimeType = (imageFile: File) => {
    const mt = imageFile.mimetype
    if (mt === "image/jpeg") return "jpg"
    if (mt === "image/png") return "png"
    if (mt === "image/webp") return "webp"
    return null
}
