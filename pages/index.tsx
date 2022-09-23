import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import Header from '../lib/header'

const Home: NextPage = () => {
    return <>
        <Header />
        <div className={styles.container}>
        </div>
    </>
}

export default Home
