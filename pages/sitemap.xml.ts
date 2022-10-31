import { GetServerSideProps } from "next"
import { prisma } from "lib/prisma"

async function generateSiteMap() {
    const artists = await prisma.artist.findMany({
        select: {
            id: true,
            role: true,
            person: true,
        },
    })
    const baseURL = "https://yy-studios.ru"
    const loc = (path: string, priority: number) =>
        `<url>
            <loc>${baseURL}${path}</loc>
            <priority>${priority}</priority>
        </url>
        <url>
            <loc>${baseURL}/ru${path}</loc>
            <priority>${priority}</priority>
        </url>
        `
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${loc("", 0.9)}
            ${artists
                .map(artist =>
                    loc(`/artists/${artist.role.url}/${artist.person.url}`, 0.7)
                )
                .join("")}
            ${loc("/about", 0.5)}
            ${loc("/contacts", 0.5)}
        </urlset>
        `
}

function SiteMap() {
    // getServerSideProps will do the heavy lifting
}

export const getServerSideProps: GetServerSideProps = async context => {
    const sitemap = await generateSiteMap()

    context.res.setHeader("Content-Type", "application/xml")
    context.res.write(sitemap)
    context.res.end()

    return {
        props: {},
    }
}

export default SiteMap
