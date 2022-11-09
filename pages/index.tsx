import type { NextPage, GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { Photo } from "@prisma/client"
import { prisma } from "lib/prisma"
import Slideshow from "lib/slideshow"
import Meta from "lib/meta"
import styles from "styles/index.module.css"

type PageProps = {
    photos: Photo[]
}

export const getServerSideProps: GetServerSideProps = async () => {
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

        const props: PageProps = {
            photos,
        }
        return {
            props,
        }
    } catch {
        const props: PageProps = {
            photos: [],
        }
        return {
            props,
        }
    }
}

const Home: NextPage<PageProps> = props => {
    const router = useRouter()

    const urls = props.photos.map(
        photo => `/photos/${photo.id}/original.${photo.ext}`
    )
    const descEn = props.photos.map(photo => photo.descriptionEn)
    const descRu = props.photos.map(photo => photo.descriptionRu)

    return (
        <div className={styles.Container}>
            <Meta />
            <Slideshow
                urls={urls}
                descriptions={router.locale == "en" ? descEn : descRu}
            />
        </div>
    )
}

export default Home
