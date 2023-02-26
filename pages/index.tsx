import type { NextPage, GetServerSideProps } from "next"
import { prisma } from "lib/prisma"
import Slideshow, { SlideProps } from "lib/slideshow"
import Meta from "lib/meta"
import getImagePath from "lib/imagepath"
import styles from "styles/index.module.css"

interface PageProps {
    slides: SlideProps[]
}

// Get a list of photos from db
export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
    const photos = await prisma.photo.findMany({
        where: {
            visibleOnHomepage: true,
        },
        orderBy: {
            order: "asc",
        },
    })
    if (photos === undefined) throw new Error("Can't load photos")

    // Generate a list of slides
    const slides: SlideProps[] = photos.map(photo => ({
        url: getImagePath(photo.id, photo.ext),
        description: locale === "ru" ? photo.descriptionRu : photo.descriptionEn
    }))

    const props: PageProps = { slides }
    return { props }
}

const Home: NextPage<PageProps> = ({ slides }) => {
    return (
        <div className={styles.Container}>
            <Meta />
            <Slideshow slides={slides} />
        </div>
    )
}

export default Home
