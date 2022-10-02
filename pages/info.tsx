import type { NextPage } from 'next'
import Link from 'next/link'
import Head from 'next/head'

import { Ru, En } from 'lib/interpreter'
import RemoteString from 'lib/text'
import styles from 'styles/info.module.css'

const Info: NextPage = () => {
    return <>
        <Head>
            <title>YY Studios</title>
        </Head>
        <div className={ styles.Info }>

            <div className={ styles.MainColumn }>
                <div className={ styles.Title }>
                    <En>ABOUT</En>
                    <Ru>О НАС</Ru>
                </div>
                <div className={ styles.Text }>
                    <En><RemoteString id="desc_en" default="Description" /></En>
                    <Ru><RemoteString id="desc_ru" default="Описание" /></Ru>
                </div>
                <div style={{ marginTop: '1em' }} className={ styles.Text }>
                    <En><RemoteString id="desc_en_2" default="Description" /></En>
                    <Ru><RemoteString id="desc_ru_2" default="Описание" /></Ru>
                </div>
            </div>

            <div className={ styles.Column }>
                <div className={ styles.Title }>
                    <En>SOCIAL MEDIA</En>
                    <Ru>СОЦСЕТИ</Ru>
                </div>
                <a href="https://instagram.com/yy_studios" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>INSTAGRAM</div>
                </a>
                <a href="https://t.me/yy_studios" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>TELEGRAM</div>
                </a>
            </div>
            <div className={ styles.Column }>
                <div className={ styles.Title }>
                    <En>GLOBAL ENQUIRES</En>
                    <Ru>ГЛОБАЛЬНЫЕ ЗАПРОСЫ</Ru>
                </div>
                <a href="mailto:info@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>INFO@YY-STUDIOS.RU</div>
                </a>
                <a href="tel:+79824500926">
                    <div className={ styles.Link }>
                        <RemoteString id="phone" default="Phone" />
                    </div>
                </a>
                <div className={ styles.Text }>
                    <En>SERGEY</En>
                    <Ru>СЕРГЕЙ</Ru>
                </div>

                <div className={ styles.Title }>
                    <En>BOOKING IN MOSCOW</En>
                    <Ru>БРОНИРОВАНИЕ В МОСКВЕ</Ru>
                </div>
                <a href="mailto:msc@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>MSC@YY-STUDIOS.RU</div>
                </a>

                <div className={ styles.Title }>
                    <En>BOOKING IN SAINT-PETERSBURG</En>
                    <Ru>БРОНИРОВАНИЕ В САНКТ-ПЕТЕРБУРГЕ</Ru>
                </div>
                <a href="mailto:sp@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>SP@YY-STUDIOS.RU</div>
                </a>

                <div className={ styles.Title }>
                    <En>FOR PARTICIPANTS</En>
                    <Ru>ДЛЯ УЧАСТНИКОВ</Ru>
                </div>
                <a href="mailto:casting@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>CASTING@YY-STUDIOS.RU</div>
                </a>
            </div>
        </div>
        
        <div className={ styles.Footer }>
            <div className={ styles.Link }>
                <En>PRIVACY POLICY</En>
                <Ru>ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ</Ru>
            </div>
            <div className={ styles.Link }>/</div>
            <div className={ styles.Link }>
                <En>TERMS AND CONDITIONS</En>
                <Ru>УСЛОВИЯ И ПОЛОЖЕНИЯ</Ru>
            </div>
            <div className={ styles.Link }>/</div>
            <Link href="/login" passHref>
                <a><div className={styles.Link}>
                    <En>CONTROL PANEL</En>
                    <Ru>ПАНЕЛЬ УПРАВЛЕНИЯ</Ru>
                </div></a>
            </Link>
        </div>
    </>
}

export default Info
