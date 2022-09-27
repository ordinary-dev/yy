import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect, useState, FormEvent } from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "../lib/session"
import styles from '../styles/admin.module.css'
import { PrismaClient, Photo } from '@prisma/client'
import Image from 'next/image'
import { DeleteOutlined, SaveOutlined, CloudUploadOutlined } from '@ant-design/icons'

type PageProps = {
    isAdmin: boolean
    photos: Photo[]
}

export const getServerSideProps = withIronSessionSsr(
    async(context) => {
        const user = context.req.session.user;

        const prisma = new PrismaClient()
        const photos = await prisma.photo.findMany({})
        
        const props: PageProps = {
            isAdmin: user !== undefined && user.isAdmin,
            photos
        }
        return { props }
    }, sessionOptions
)


const AdminPage: NextPage<PageProps> = props => {
    // Redirect to login page
    // If user is not authorized
    useEffect(() => {
        if (!props.isAdmin) {
            setTimeout(() => Router.push('/login'), 1000)
        }
    }, [props.isAdmin])

    if (props.isAdmin) return <div className={ styles.Container }>
        <div>Hi, admin</div>
        <div>List of photos:</div>
        { props.photos.map((photo, index) =>
            <Photo key={ index }
                   id={ photo.id }
                   ext={ photo.ext }
                   descEn={ photo.descriptionEn }
                   descRu={ photo.descriptionRu }
                   width={ photo.width } height={ photo.height } />) }
        <UploadForm />
        <button className={ styles.Button } onClick={(e) => logout()}>Logout</button>
    </div>
    
    return <div className={ styles.Container }>
        You are not the admin
    </div>
}

const Photo = (props: {
    id: number,
    ext: string,
    height: number, width: number,
    descEn: string | null, descRu: string | null
}) => {
    const [descRu, setDescRu] = useState(props.descRu ? props.descRu : "")
    const [descEn, setDescEn] = useState(props.descEn ? props.descEn : "")

    const maxSize = 150
    const div = props.width > props.height ? props.width / maxSize : props.height / maxSize
    const height = Math.floor(props.height / div)
    const width = Math.floor(props.width / div)

    return <div className={ styles.Photo }>
        <Image src={ `http://router/photos/${props.id}/original.${props.ext}` }
               width={ width }
               height={ height }
               alt="Uploaded photo" />
        <div className={ styles.Stack }>
            <input placeholder="English description"
                   value={ descEn }
                   onChange={ (e) => setDescEn(e.target.value) }
                   type="text" />
            <input placeholder="Russian description"
                   value={ descRu }
                   onChange={ (e) => setDescRu(e.target.value) }
                   type="text" />
            <button className={ styles.Button } onClick={ () => updatePhoto(props.id, descEn, descRu ) }>
                <SaveOutlined /> Save
            </button>
            <button className={ styles.Button } onClick={ () => deletePhoto(props.id) }>
                <DeleteOutlined /> Delete
            </button>
        </div>
    </div>
}

const updatePhoto = async(id: number, descEn: string, descRu: string) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, descEn, descRu })
    }
    await fetch('/api/update', options)
}

const deletePhoto = async(id: number ) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }
    await fetch('/api/delete', options)
}

const logout = async() => {
    const response = await fetch('/api/logout')
    const res = await response.json()
    if ( res.ok ) Router.push('/login')
}

const UploadForm = () => {
    return <>
        <div>Upload new photo</div>
        <form onSubmit={ e => handleSubmit(e) }>
            <input type="file"
                   accept="image/png, image/jpeg, image/webp"
                   name="image"
                   required />
            <button type="submit" className={ styles.Button }>
                <CloudUploadOutlined />
            </button>
        </form>
    </>
}

interface UploadForm extends HTMLFormElement {
    image: HTMLInputElement
}

const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()

    const target = e.target as UploadForm
    if (!target.image.files || target.image.files.length < 1)
        throw new Error("No files selected")

    const image = target.image.files[0]
    const formData = new FormData()
    formData.append("image", image)

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json'
        },
        body: formData
    }

    const res = await fetch("/api/upload", options)
    const result = await res.json()
        
    // Server returned an error
    if (!result.ok) throw new Error(result.message)

    target.reset()
}

export default AdminPage
