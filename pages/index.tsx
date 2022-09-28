import type { NextPage } from 'next'
import Image from 'next/image'
import { GetServerSideProps } from 'next'
import { Photo } from '@prisma/client'
import { prisma } from '../lib/prisma'
import { useState, ReactNode, useEffect } from 'react'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import styles from '../styles/index.module.css'
import Head from 'next/head'

type PageProps = {
    photos: Photo[]
}

export const getServerSideProps: GetServerSideProps = async(context) => {
    const photos = await prisma.photo.findMany({})
    const props = {
        photos
    }
    return { props }
}

const Home: NextPage<PageProps> = (props) => {
    const [maxSize, setMaxSize] = useState(400)
    const [index, setIndex] = useState(0)

    // Calculate max photo size
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth
            const height = window.innerHeight - 127
            setMaxSize(width < height ? width - 150 : height - 150)
        }

        window.addEventListener("resize", handleResize)
        handleResize()

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    // Create list of photos
    const imageList = props.photos.map(photo => {
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
