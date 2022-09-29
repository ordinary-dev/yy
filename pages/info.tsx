import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/info.module.css'
import Head from 'next/head'
import { useRouter } from 'next/router'

const Info: NextPage = props => {
    const router = useRouter()
    const t = (en: string, ru: string) => {
        if (router.locale === 'ru') return ru
        return en
    }

    return <>
        <Head><title>{ t('INFO', 'ИНФО') } | YY studios</title></Head>
        <div className={ styles.Info }>

            <div className={ styles.MainColumn }>
                <div className={ styles.Title }>{ t('ABOUT', 'О НАС') }</div>
                <div className={ styles.Text }>{ t('YY STUDIOS IS A LOCAL ARTIST MANAGEMENT & PRODUCTION AGENCY REPRESENTING TALENT IN THE FIELDS OF FASHION AND BEAUTY. FOUNDED IN SAINT-PETERSBURG IN 2022, YY STUDIOS HAS CULTIVATED A COMMUNITY OF ARTISTS AND AGENT WHO FOCUS ON THE DISCIPLINES OF IMAGE MAKING, STYLING, HAIR, MAKEUP, CASTING AND CREATIVE DIRECTION. BEYOND DAY-TO-DAY MANAGEMENT AND REPRESENTATION, YY STUDIOS WORKS WITH THEIR ARTISTS AND CLIENTS ON PROJECTS OF ALL TYPES INCLUDING BRAND AND PRODUCT DEVELOPMENT, IMAGE LICENSING, EXHIBITIONS AND BOOK PUBLISHING.', 'YY STUDIOS — МЕСТНОЕ АГЕНТСТВО, ПРЕДСТАВЛЯЮЩЕЕ ТАЛАНТЫ В ОБЛАСТИ МОДЫ И КРАСОТЫ. YY STUDIOS, ОСНОВАННАЯ В САНКТ-ПЕТЕРБУРГЕ В 2022 ГОДУ, СОЗДАЛА СООБЩЕСТВО ХУДОЖНИКОВ И АГЕНТОВ, КОТОРЫЕ ФОКУСИРОВАНЫ НА ДИСЦИПЛИНАХ ИЗГОТОВЛЕНИЯ ИМИДЖА, УКЛАДКИ, ПРИЧЕСОК, МАКИЯЖА, КАСТЕРА И ТВОРЧЕСКОГО НАПРАВЛЕНИЯ. ПОМИМО ПОВСЕДНЕВНОГО УПРАВЛЕНИЯ И ПРЕДСТАВИТЕЛЬСТВА, YY STUDIOS РАБОТАЕТ СО СВОИМИ ХУДОЖНИКАМИ И КЛИЕНТАМИ ПО ПРОЕКТАМ ВСЕХ ТИПОВ, ВКЛЮЧАЯ РАЗРАБОТКУ БРЕНДА И ПРОДУКЦИИ, ЛИЦЕНЗИРОВАНИЕ ИЗОБРАЖЕНИЙ, ВЫСТАВКИ И ИЗДАНИЕ КНИГ.') }</div>
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
                    <div className={ styles.Link }>+7 (982) 450-09-26</div>
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
