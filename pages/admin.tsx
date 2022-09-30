import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect, useState, FormEvent } from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "../lib/session"
import styles from '../styles/admin.module.css'
import { Photo } from '@prisma/client'
import Image from 'next/image'
import Head from 'next/head'
import { DeleteOutlined, SaveOutlined, CloudUploadOutlined, ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons'
import useSWR, { useSWRConfig } from 'swr'

type PageProps = {
    isAdmin: boolean
}

export const getServerSideProps = withIronSessionSsr(
    async(context) => {
        const user = context.req.session.user;

        const props: PageProps = {
            isAdmin: user !== undefined && user.isAdmin,
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

    const { data, error } = useSWR<{ photos: Photo[] }, Error>('/api/photo')
    const { mutate } = useSWRConfig()
    
    const updateList = () => {
        mutate('/api/photo')
    }

    if (error) return <ExclamationCircleOutlined />
    if (!data) return <LoadingOutlined spin={ true } />
    
    if (props.isAdmin) return <div className={ styles.Container }>
        <Head><title>Admin | YY studios</title></Head>
        <div>Hi, admin</div>
        <div>List of photos:</div>
        { data.photos.map((photo, index) =>
            <Photo key={ index }
                   id={ photo.id }
                   ext={ photo.ext }
                   descEn={ photo.descriptionEn }
                   descRu={ photo.descriptionRu }
                   width={ photo.width } height={ photo.height }
                   updateList={ updateList } />) }
        <UploadForm updateList={ updateList }/>
        <button className={ styles.Button } onClick={() => logout()}>Logout</button>
    </div>
    
    return <div className={ styles.Container }>
        <Head><title>Redirecting... | YY studios</title></Head>
        You are not the admin
    </div>
}

const Photo = (props: {
    id: number,
    ext: string,
    height: number, width: number,
    descEn: string | null, descRu: string | null,
    updateList: () => void
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
            <button className={ styles.Button } onClick={ () => deletePhoto(props.id, props.updateList) }>
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

const deletePhoto = async(id: number, updateList: () => void ) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }
    await fetch('/api/delete', options)
    updateList()
}

const logout = async() => {
    const response = await fetch('/api/logout')
    const res = await response.json()
    if ( res.ok ) Router.push('/login')
}

const UploadForm = (props: { updateList: () => void }) => {
    return <>
        <div>Upload new photo</div>
        <form onSubmit={ e => handleSubmit(e, props.updateList) }>
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

const handleSubmit = async(e: FormEvent, updateList: () => void ) => {
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

    // Update photo list
    updateList()
}

export default AdminPage
