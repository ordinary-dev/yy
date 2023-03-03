import type { NextPage } from "next"
import Router from "next/router"
import { useEffect, FormEvent } from "react"
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "lib/session"
import Meta from "lib/meta"
import styles from "styles/login.module.css"

type PageProps = {
    isAdmin: boolean
}

export const getServerSideProps = withIronSessionSsr(async (context) => {
    const user = context.req.session.user

    return {
        props: {
            isAdmin: user !== undefined,
        },
    }
}, sessionOptions)

const LoginPage: NextPage<PageProps> = (props) => {
    // Redirect to admin panel
    // if user is authorized
    useEffect(() => {
        if (props.isAdmin) Router.push("/admin")
    }, [props.isAdmin])

    return (
        <div className={styles.Container}>
            <Meta title="Login" />
            <h1>YY</h1>
            <form className={styles.Form} onSubmit={handleSubmit}>
                <input placeholder="Login" type="text" name="login" required />
                <input placeholder="Password" type="password" name="password" required />
                <button type="submit">Let me in!</button>
            </form>
        </div>
    )
}

interface LoginForm extends HTMLFormElement {
    login: HTMLInputElement
    password: HTMLInputElement
}

const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const target = e.currentTarget as LoginForm
    const login = target.login.value
    const password = target.password.value

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            login,
            password,
        }),
    }

    const response = await fetch("/api/login", options)
    if (!response.ok) alert("Wrong credentials")
    else Router.push("/admin")
}

export default LoginPage
