import type { NextPage } from "next"
import { ExclamationCircleOutlined, LoadingOutlined } from "@ant-design/icons"
import Head from "next/head"
import useSWR from "swr"
import { useRouter } from "next/router"

import Slideshow from "lib/slideshow"
import styles from "styles/index.module.css"
import { PhotoAPI } from "./api/photo"

const Home: NextPage = () => {
    const { data, error } = useSWR<PhotoAPI, Error>("/api/photo")
    const router = useRouter()

    if (error)
        return (
            <div className={styles.Container}>
                <ExclamationCircleOutlined />
            </div>
        )
    if (!data)
        return (
            <div className={styles.Container}>
                <LoadingOutlined spin={true} />
            </div>
        )

    const urls = data.photos.map(
        photo => `http://photo-storage/${photo.id}/original.${photo.ext}`
    )
    const descEn = data.photos.map(photo => photo.descriptionEn)
    const descRu = data.photos.map(photo => photo.descriptionRu)

    return (
        <div className={styles.Container}>
            <Head>
                <title>YY Studios</title>
            </Head>
            <Slideshow
                urls={urls}
                descriptions={router.locale == "en" ? descEn : descRu}
            />
        </div>
    )
}

export default Home
