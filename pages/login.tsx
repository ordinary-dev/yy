import type { NextPage } from 'next'
import Router from 'next/router'
import { useEffect, FormEvent } from 'react'
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "../lib/session"
import styles from '../styles/login.module.css'
import Head from 'next/head'

type PageProps = {
    isAdmin: boolean
}

export const getServerSideProps = withIronSessionSsr(
    async(context) => {
        const user = context.req.session.user;

        return {
            props: {
                isAdmin: user !== undefined && user.isAdmin
            }
        }
    }, sessionOptions
)

const LoginPage: NextPage<PageProps> = props => {
    // Redirect to admin panel
    // if user is authorized
    useEffect(() => {
        if (props.isAdmin) Router.push('/admin')
    }, [props.isAdmin])

    return <div className={ styles.Container }>
        <Head><title>Login | YY studios</title></Head>
        <div>&#47;&#47; Login form</div>
        <form className={ styles.Form } onSubmit={(e) => handleSubmit(e)} >
            <input placeholder="Login" type="text" name="login" required />
            <input placeholder="Password" type="password" name="password" required />
            <button type="submit">Let me in!</button>
        </form>
    </div>
}

interface LoginForm extends HTMLFormElement {
    login: HTMLInputElement
    password: HTMLInputElement
}

const handleSubmit = async(e: FormEvent) => {
    e.preventDefault()
    
    const target = e.currentTarget as LoginForm
    const login = target.login.value
    const password = target.password.value

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            login, password
        })
    }

    const response = await fetch('/api/login', options)
    const res = await response.json()

    if ( !res.ok ) console.error('Wrong credentials')
    else Router.push('/admin')
}

export default LoginPage
