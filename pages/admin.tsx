import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect, FormEvent } from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "../lib/session"
import styles from '../styles/admin.module.css'
import { PrismaClient, Photo } from '@prisma/client'

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
            <div key={ index }>{ index }. { photo.descriptionEn }</div>) }
        <UploadForm />
        <button onClick={(e) => logout()}>Logout</button>
    </div>
    
    return <div className={ styles.Container }>
        You are not the admin
    </div>
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
            <button type="submit">Submit</button>
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
