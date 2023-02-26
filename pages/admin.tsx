import type { NextPage } from "next"
import Router from "next/router"
import { withIronSessionSsr } from "iron-session/next"
import { sessionOptions } from "lib/session"
import ListOfPhotos from "lib/admin/photos"
import PasswordManager from "lib/admin/password"
import Artists from "lib/admin/artists"
import Meta from "lib/meta"
import styles from "styles/admin.module.css"

export const getServerSideProps = withIronSessionSsr(async (context) => {
    const user = context.req.session.user

    if (user === undefined) return {
        redirect: {
            destination: '/login',
            permanent: false,
        }
    }

    return { props: {} }
}, sessionOptions)

const AdminPage: NextPage = () => (
    <div className={styles.Container}>
        <Meta title="Admin" />
        <div>Hi, admin</div>
        <ListOfPhotos />
        <Artists />
        <PasswordManager />
        <button className={styles.Button} onClick={() => logout()}>
            Logout
        </button>
    </div>
)

const logout = async () => {
    const response = await fetch("/api/logout")
    if (response.ok) Router.push("/login")
}

export default AdminPage
