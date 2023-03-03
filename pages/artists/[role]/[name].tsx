import Image from "next/image"
import { GetServerSideProps } from "next"
import sanitizeHtml from 'sanitize-html'
import { Photo } from "@prisma/client"
import { prisma } from "lib/prisma"
import Meta from "lib/meta"
import getImagePath from "lib/imagepath"
import styles from "styles/artists.module.css"

type PageProps = {
    photos: Photo[]
    title: string
    locale: string | undefined
}

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
    if (!query.role || !query.name) return {
        notFound: true
    }
    const role = query.role.toString()
    const name = query.name.toString()

    const person = await prisma.person.findUnique({
        where: {
            url: name,
        },
    })
    if (!person) return {
        notFound: true
    }

    const photos = await prisma.photo.findMany({
        where: {
            artists: {
                some: {
                    person: {
                        url: name,
                    },
                    role: {
                        url: role,
                    },
                },
            },
        },
        orderBy: {
            order: "asc",
        },
    })
    if (photos === undefined) return {
        notFound: true
    }

    const props: PageProps = {
        title: locale === "ru" ? person.nameRu : person.nameEn,
        photos,
        locale,
    }
    return { props }
}

const Artist = ({title, photos, locale}: PageProps) => (
    <div className={styles.Container}>
        <Meta title={title} />
        <div>
            {photos
                .filter((_v, i) => i % 2 == 0)
                .map((photo) => (
                    <ImageWrapper key={photo.id} data={photo} locale={locale} />
                ))}
        </div>
        <div>
            {photos
                .filter((_v, i) => i % 2 == 1)
                .map((photo) => (
                    <ImageWrapper key={photo.id} data={photo} locale={locale} />
                ))}
        </div>
    </div>
)

const ImageWrapper = ({ locale, data }: { locale: string | undefined, data: Photo }) => {
    const width = 330
    const height = data.height / (data.width / width)

    // Generate alt tags
    const getEnAltTag = () => data.descriptionEn
        ? sanitizeHtml(data.descriptionEn, { allowedTags: [] })
        : "Photo by YY Studios"
    const getRuAltTag = () => data.descriptionRu
        ? sanitizeHtml(data.descriptionRu, { allowedTags: [] })
        : "Фото YY Studios"

    return (
        <div className={styles.Photo}>
            <Image
                src={getImagePath(data.id, data.ext)}
                width={width}
                height={height}
                alt={locale === "ru" ? getRuAltTag() : getEnAltTag()}
                unoptimized
            />
        </div>
    )
}

export default Artist
