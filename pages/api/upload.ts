import { NextApiRequest, NextApiResponse } from "next"
import { IncomingForm, Files } from "formidable"
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

export default withIronSessionApiRoute(handle, sessionOptions)

async function handle(req: NextApiRequest, res: NextApiResponse) {
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

        const image = Array.isArray(files.image) ? files.image[0] : files.image

        // Get file extension
        if (!image.mimetype) throw new Error("Mimetype is undefined")
        if (!image.mimetype.includes("image"))
            throw new Error("Wrong file type")
        const ext = image.mimetype.split("/").pop()
        if (!ext) throw new Error("File extension is undefined")

        // Get metadata
        const meta = await sharp(image.filepath).metadata()
        if (!meta.height || !meta.width) throw new Error("Cannot get metadata")

        // Save photo in db
        const photo = await prisma.photo.create({
            data: {
                ext: ext,
                width: meta.width,
                height: meta.height,
                size: image.size,
            },
        })
        if (!photo) throw new Error("Cannot save photo")

        // Create directories
        const uploadDir = `/app/photos/${photo.id}`
        if (!fs.existsSync(uploadDir)) {
            await fs.promises.mkdir(uploadDir, { recursive: true })
        }

        // Move file
        const destination = `${uploadDir}/original.${ext}`
        fs.copyFileSync(image.filepath, destination)
        fs.unlinkSync(image.filepath)

        res.status(200).json({})
    } catch {
        res.status(400).json({})
    }
}
