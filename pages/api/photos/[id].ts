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

        // For safety
        if (ext.includes("."))
            throw new Error("Invalid characters in extension")

        // Try to read the image
        const filepath = `photos/${id}/original.${ext}`
        const stat = fs.statSync(filepath)

        // Send headers
        res.writeHead(200, {
            "Content-Type": `image/${ext.toLowerCase()}`,
            "Content-Length": stat.size,
            "Cache-Control": "max-age=31557600",
        })

        // Send the file
        const readStream = fs.createReadStream(filepath)
        await new Promise(function (resolve) {
            readStream.pipe(res)
            readStream.on("end", resolve)
        })
    } catch (err) {
        console.error(getErrorMessage(err))
        res.status(404).json({ msg: "Not found" })
    }
}

export default handle
