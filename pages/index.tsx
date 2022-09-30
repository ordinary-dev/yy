import type { NextPage } from 'next'
import Image from 'next/image'
import { Photo } from '@prisma/client'
import { useState, ReactNode } from 'react'
import { LeftOutlined, RightOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from '../styles/index.module.css'
import Head from 'next/head'
import useSWR from 'swr'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
    const { data, error } = useSWR<{ photos: Photo[] }, Error>('/api/photo')
    const router = useRouter()
    const [index, setIndex] = useState(0)

    if (error) return <ExclamationCircleOutlined />
    if (!data) return <LoadingOutlined spin={ true } />

    const t = (en: string | null, ru: string | null) => {
        if (router.locale == 'ru') return ru
        return en
    }
    
    // Create list of photos
    const imageList = data.photos.map(photo =>
        <Image src={`http://router/photos/${photo.id}/original.${photo.ext}`}
               alt="Photo"
               layout="fill"
               objectFit="contain"
               key={ photo.id } />)

    // Functions that change the current photo
    const prev = () => {
        if (index > 0) setIndex(index - 1)
        else setIndex(imageList.length - 1)
    }
    const next = () => {
        if (index + 1 < imageList.length) setIndex(index + 1)
        else setIndex(0)
    }

    return <div className={styles.Container} >
        <Head><title>YY studios</title></Head>
        
        <div className={ styles.MainRow }>
            <Button onClick={ prev }>
                <LeftOutlined />
            </Button>
        
            <div className={ styles.Placeholder } >
                { imageList.length > 0 && imageList[index] }
            </div>
        
            <Button onClick={ next }>
                <RightOutlined />
            </Button>
        </div>
        
        <div className={ styles.Description }>
            { data.photos.length > 0 && t(data.photos[index].descriptionEn, data.photos[index].descriptionRu) }
        </div>
    </div>
}

const Button = (props: {
    onClick: () => void,
    children: ReactNode
}) => {
    return <button className={ styles.Button } onClick={ props.onClick }>{props.children}</button>
}

export default Home
