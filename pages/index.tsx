import type { NextPage } from 'next'
import { Photo } from '@prisma/client'
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'

import Slideshow from 'lib/slideshow'
import styles from 'styles/index.module.css'

const Home: NextPage = () => {
    const { data, error } = useSWR<{ photos: Photo[] }, Error>('/api/photo')
    const router = useRouter()

    if (error) return <ExclamationCircleOutlined />
    if (!data) return <LoadingOutlined spin={ true } />

    const urls = data.photos.map(photo => `http://router/photos/${photo.id}/original.${photo.ext}`)
    const descEn = data.photos.map(photo => photo.descriptionEn)
    const descRu = data.photos.map(photo => photo.descriptionRu)

    return <div className={styles.Container} >
        <Head><title>YY studios</title></Head>        
        <Slideshow urls={ urls }
                   descriptions={ router.locale == 'en' ? descEn : descRu } />
    </div>
}

export default Home
