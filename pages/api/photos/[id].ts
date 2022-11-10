import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { getErrorMessage } from "lib/error"

// Sends uploaded photo.
// Usage: GET /api/photos/[id], where id === [photoId].[photoExtension].
// Example: GET /api/photos/1.jpg
const handle = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        // Get id and extension
        if (!req.query.id) throw new Error("Photo id is undefined")
        const [id, ext] = req.query.id.toString().split(".")

        // Try to read the image
        const imageBuffer = await fs.promises.readFile(
            `photos/${id}/original.${ext}`
        )

        res.setHeader("Content-Type", `image/${ext.toLowerCase()}`)
        res.send(imageBuffer)
    } catch (err) {
        console.error(getErrorMessage(err))
        res.status(404).json({ msg: "Not found" })
    }
}

export default handle
