import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect } from 'react'
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
        
        return {
            props: {
                isAdmin: user !== undefined && user.isAdmin,
                photos: photos
            }
        }
    }, sessionOptions
)


const AdminPage: NextPage<PageProps> = props => {
    // Redirect to login page
    // If user is not authorized
    useEffect(()=>{
        if (!props.isAdmin) {
            setTimeout(() => Router.push('/login'), 1000)
        }
    }, [props.isAdmin])

    if (props.isAdmin) return <div className={ styles.Container }>
        <div>Hi, admin</div>
        <div>List of photos:</div>
        { props.photos.map((photo, index) =>
            <div key={ index }>{ index }. { photo.descriptionEn }</div>) }
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

export default AdminPage
