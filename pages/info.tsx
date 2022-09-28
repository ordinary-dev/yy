import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/info.module.css'
import Head from 'next/head'

const Info: NextPage = props => {
    return <>
        <Head><title>Info | YY studios</title></Head>
        <div className={ styles.Info }>
            <div className={ styles.MainColumn }>
                <div className={ styles.Title }>ABOUT</div>
                <div className={ styles.Text }>
                    YY STUDIOS IS A LOCAL ARTIST MANAGEMENT & PRODUCTION AGENCY REPRESENTING TALENT
                    IN THE FIELDS OF FASHION AND BEAUTY. FOUNDED IN SAINT-PETERSBURG IN 2022, YY STUDIOS
                    HAS CULTIVATED A COMMUNITY OF ARTISTS AND AGENT WHO FOCUS ON THE DISCIPLINES OF IMAGE MAKING,
                    STYLING, HAIR, MAKEUP, CASTING AND CREATIVE DIRECTION.   BEYOND DAY-TO-DAY MANAGEMENT
                    AND REPRESENTATION, YY STUDIOS WORKS WITH THEIR ARTISTS AND CLIENTS ON PROJECTS
                    OF ALL TYPES INCLUDING BRAND AND PRODUCT DEVELOPMENT, IMAGE LICENSING, EXHIBITIONS
                    AND BOOK PUBLISHING.
                </div>
            </div>
            <div className={ styles.Column }>
                <div className={ styles.Title }>SOCIAL MEDIA</div>
                <a href="https://instagram.com/yy_studios" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>INSTAGRAM</div>
                </a>
                <a href="https://t.me/yy_studios" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>TELEGRAM</div>
                </a>
            </div>
            <div className={ styles.Column }>
                <div className={ styles.Title }>GLOBAL ENQUIRES</div>
                <a href="mailto:info@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>INFO@YY-STUDIOS.RU</div>
                </a>
                <a href="tel:+79824500926">
                    <div className={ styles.Link }>+7 (982) 450-09-26</div>
                </a>
                <div className={ styles.Text }>SERGEY</div>

                <div className={ styles.Title }>BOOKING IN MOSCOW</div>
                <a href="mailto:msc@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>MSC@YY-STUDIOS.RU</div>
                </a>

                <div className={ styles.Title }>BOOKING IN SAINT-PETERSBURG</div>
                <a href="mailto:sp@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>SP@YY-STUDIOS.RU</div>
                </a>

                <div className={ styles.Title }>FOR PARTICIPANTS</div>
                <a href="mailto:casting@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>CASTING@YY-STUDIOS.RU</div>
                </a>
            </div>
        </div>
        
        <div className={ styles.Footer }>
            <div className={ styles.Link }>PRIVACY POLICY</div>
            <div className={ styles.Link }>/</div>
            <div className={ styles.Link }>TERMS AND CONDITIONS</div>
            <div className={ styles.Link }>/</div>
            <Link href="/login" passHref>
                <a><div className={styles.Link}>CONTROL PANEL</div></a>
            </Link>
        </div>
    </>
}

export default Info
