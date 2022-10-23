import useSWR from "swr"
import { useRouter } from "next/router"
import Image from "next/image"
import Head from "next/head"
import { Photo } from "@prisma/client"
import styles from "styles/artists.module.css"
import { ArtistPageGoodResponse } from "pages/api/photos/[role]/[name]"

const Artist = () => {
    const router = useRouter()

    const role = router.query.role ? router.query.role.toString() : undefined
    const name = router.query.name ? router.query.name.toString() : undefined

    const { data, error } = useSWR<ArtistPageGoodResponse, Error>(
        role && name ? `/api/photos/${role}/${name}` : null
    )

    if (error || !role || !name) return <div>Error</div>
    if (!data) return <div>Loading</div>

    return (
        <div className={styles.Container}>
            <Head>
                <title>{decode(name)} | YY Studios</title>
            </Head>
            <div>
                {data.photos
                    .filter((_v, i) => i % 2 == 0)
                    .map(photo => (
                        <ImageWrapper key={photo.id} data={photo} />
                    ))}
            </div>
            <div>
                {data.photos
                    .filter((_v, i) => i % 2 == 1)
                    .map(photo => (
                        <ImageWrapper key={photo.id} data={photo} />
                    ))}
            </div>
        </div>
    )
}

const decode = (s: string) => {
    const withSpaces = s.replace(/-/g, " ")
    const capitalized = withSpaces
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    return capitalized.join(" ")
}

const ImageWrapper = ({ data }: { data: Photo }) => {
    const width = 445
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
