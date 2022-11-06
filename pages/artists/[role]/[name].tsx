import Image from "next/image"
import { GetServerSideProps } from "next"
import { Photo } from "@prisma/client"
import { prisma } from "lib/prisma"
import Meta from "lib/meta"
import styles from "styles/artists.module.css"

type PageProps = {
    photos: Photo[]
    title: string
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    try {
        if (!query.role || !query.name)
            throw new Error("Undefined role or name")
        const role = query.role.toString()
        const name = query.name.toString()

        const person = await prisma.person.findUnique({
            where: {
                url: name,
            },
        })
        if (!person) throw new Error("Can't find person")

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
        if (photos === undefined) throw new Error("Can't find photos")

        const props: PageProps = {
            photos: photos,
            title: person.nameEn,
        }
        return { props }
    } catch {
        const props: PageProps = {
            photos: [],
            title: "404",
        }
        return { props }
    }
}

const Artist = (props: PageProps) => {
    return (
        <div className={styles.Container}>
            <Meta title={props.title} />
            <div>
                {props.photos
                    .filter((_v, i) => i % 2 == 0)
                    .map(photo => (
                        <ImageWrapper key={photo.id} data={photo} />
                    ))}
            </div>
            <div>
                {props.photos
                    .filter((_v, i) => i % 2 == 1)
                    .map(photo => (
                        <ImageWrapper key={photo.id} data={photo} />
                    ))}
            </div>
        </div>
    )
}

const ImageWrapper = ({ data }: { data: Photo }) => {
    const width = 330
    const height = data.height / (data.width / width)
    return (
        <div className={styles.Photo}>
            <Image
                src={`/photos/${data.id}/original.${data.ext}`}
                width={width}
                height={height}
                alt={data.descriptionEn ? data.descriptionEn : "Photo"}
                unoptimized={true}
            />
        </div>
    )
}

export default Artist
