import type { NextPage } from 'next'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { Photo } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { useState, ReactNode, useEffect } from 'react'
import { LeftOutlined, RightOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import styles from '../styles/index.module.css'
import Head from 'next/head'
import useSWR from 'swr'

const Home: NextPage = () => {
    const { data, error } = useSWR<{ photos: Photo[] }, Error>('/api/photo')

    const [maxSize, setMaxSize] = useState(400)
    const [index, setIndex] = useState(0)

    // Calculate max photo size
    useEffect(() => {
        function handleResize() {
            const headerHeight = 127
            const margin = 150
            
            const width = window.innerWidth
            const height = window.innerHeight - headerHeight
            
            setMaxSize(Math.min(width - margin, height - margin, 1024))
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    if (error) return <ExclamationCircleOutlined />
    if (!data) return <LoadingOutlined spin={ true } />
    
    // Create list of photos
    const imageList = data.photos.map(photo => {
        const div = photo.width > photo.height ? photo.width / maxSize : photo.height / maxSize
        const height = Math.floor(photo.height / div)
        const width = Math.floor(photo.width / div)
        return <div key={ photo.id } >
            <Image src={`http://router/photos/${photo.id}/original.${photo.ext}`}
                   width={ width }
                   height={ height }
                   alt="Photo" />
            <div className={ styles.Description }>{ photo.descriptionEn }</div>
        </div>
    })

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
        <Button onClick={ prev }>
            <LeftOutlined />
        </Button>
        
        <div style={{width: maxSize, height: maxSize}} className={ styles.Placeholder } >
            { imageList.length > 0 && imageList[index] }
        </div>
        
        <Button onClick={ next }>
            <RightOutlined />
        </Button>
    </div>
}

const Button = (props: {
    onClick: () => void,
    children: ReactNode
}) => {
    return <button className={ styles.Button } onClick={ props.onClick }>{props.children}</button>
}

export default Home
