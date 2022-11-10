import type { NextPage, GetStaticProps } from "next"
import { prisma } from "lib/prisma"
import Slideshow from "lib/slideshow"
import Meta from "lib/meta"
import getImagePath from "lib/imagepath"
import styles from "styles/index.module.css"

type PageProps = {
    links: string[]
    descriptions: (string | null)[]
}

// Get a list of photos from db
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    try {
        const photos = await prisma.photo.findMany({
            where: {
                visibleOnHomepage: true,
            },
            orderBy: {
                order: "asc",
            },
        })
        if (photos === undefined) throw new Error("Can't load photos")

        // Generate links to files
        const links = photos.map(photo => getImagePath(photo.id, photo.ext))

        // Generate an array of descriptions
        const descriptions =
            locale === "en"
                ? photos.map(photo => photo.descriptionEn)
                : photos.map(photo => photo.descriptionRu)

        const props: PageProps = {
            links,
            descriptions,
        }
        return {
            props,
            // Next.js will attempt to re-generate the page:
            // - When a request comes in
            // - At most once every 60 seconds
            revalidate: 60,
        }
    } catch {
        const props: PageProps = {
            links: [],
            descriptions: [],
        }
        return {
            props,
            revalidate: 15,
        }
    }
}

const Home: NextPage<PageProps> = props => {
    return (
        <div className={styles.Container}>
            <Meta />
            <Slideshow urls={props.links} descriptions={props.descriptions} />
        </div>
    )
}

export default Home
