import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/info.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'
import RemoteString from '../lib/text'

const Info: NextPage = () => {
    const router = useRouter()
    const t = (en: ReactNode, ru: ReactNode) => {
        if (router.locale === 'ru') return ru
        return en
    }

    return <>
        <Head><title>{ t('INFO', 'ИНФО') } | YY studios</title></Head>
        <div className={ styles.Info }>

            <div className={ styles.MainColumn }>
                <div className={ styles.Title }>{ t('ABOUT', 'О НАС') }</div>
                <div className={ styles.Text }>{ t(
                    <RemoteString id="desc_en" default="Description" />,
                    <RemoteString id="desc_ru" default="Описание" />
                ) }</div>
                <div style={{ marginTop: '1em' }} className={ styles.Text }>{ t(
                    <RemoteString id="desc_en_2" default="Description" />,
                    <RemoteString id="desc_ru_2" default="Описание" />
                ) }</div>
            </div>

            <div className={ styles.Column }>
                <div className={ styles.Title }>{ t('SOCIAL MEDIA', 'СОЦСЕТИ') }</div>
                <a href="https://instagram.com/yy_studios" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>INSTAGRAM</div>
                </a>
                <a href="https://t.me/yy_studios" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>TELEGRAM</div>
                </a>
            </div>
            <div className={ styles.Column }>
                <div className={ styles.Title }>{ t('GLOBAL ENQUIRES', 'ГЛОБАЛЬНЫЕ ЗАПРОСЫ') }</div>
                <a href="mailto:info@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>INFO@YY-STUDIOS.RU</div>
                </a>
                <a href="tel:+79824500926">
                    <div className={ styles.Link }>
                        <RemoteString id="phone" default="Phone" />
                    </div>
                </a>
                <div className={ styles.Text }>{ t('SERGEY', 'СЕРГЕЙ') }</div>

                <div className={ styles.Title }>{ t('BOOKING IN MOSCOW', 'БРОНИРОВАНИЕ В МОСКВЕ') }</div>
                <a href="mailto:msc@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>MSC@YY-STUDIOS.RU</div>
                </a>

                <div className={ styles.Title }>{ t('BOOKING IN SAINT-PETERSBURG', 'БРОНИРОВАНИЕ В САНКТ-ПЕТЕРБУРГЕ') }</div>
                <a href="mailto:sp@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>SP@YY-STUDIOS.RU</div>
                </a>

                <div className={ styles.Title }>{ t('FOR PARTICIPANTS', 'ДЛЯ УЧАСТНИКОВ') }</div>
                <a href="mailto:casting@yy-studios.ru" target="_blank" rel="noreferrer">
                    <div className={ styles.Link }>CASTING@YY-STUDIOS.RU</div>
                </a>
            </div>
        </div>
        
        <div className={ styles.Footer }>
            <div className={ styles.Link }>{ t('PRIVACY POLICY', 'ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ')}</div>
            <div className={ styles.Link }>/</div>
            <div className={ styles.Link }>{ t('TERMS AND CONDITIONS', 'УСЛОВИЯ И ПОЛОЖЕНИЯ') }</div>
            <div className={ styles.Link }>/</div>
            <Link href="/login" passHref>
                <a><div className={styles.Link}>{ t('CONTROL PANEL', 'ПАНЕЛЬ УПРАВЛЕНИЯ') }</div></a>
            </Link>
        </div>
    </>
}

export default Info
