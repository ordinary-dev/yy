import type { NextPage } from "next"
import Head from "next/head"

import { Ru, En } from "lib/interpreter"
import styles from "styles/info.module.css"

const Info: NextPage = () => {
    return (
        <div className={styles.Info}>
            <Head>
                <title>YY Studios</title>
            </Head>
            <div className={styles.Column}>
                <div className={styles.Title}>
                    <En>ABOUT</En>
                    <Ru>О НАС</Ru>
                </div>
                <div className={styles.Text}>
                    <En>
                        YY STUDIOS IS A LOCAL ARTIST MANAGEMENT & PRODUCTION
                        AGENCY REPRESENTING TALENT IN THE FIELDS OF FASHION AND
                        BEAUTY. FOUNDED IN SAINT-PETERSBURG IN 2022, YY STUDIOS
                        HAS CULTIVATED A COMMUNITY OF ARTISTS AND AGENT WHO
                        FOCUS ON THE DISCIPLINES OF IMAGE MAKING, STYLING, HAIR,
                        MAKEUP, CASTING AND CREATIVE DIRECTION.
                    </En>
                    <Ru>
                        YY STUDIOS — МЕСТНОЕ АГЕНТСТВО, ПРЕДСТАВЛЯЮЩЕЕ ТАЛАНТЫ В
                        ОБЛАСТИ МОДЫ И КРАСОТЫ. YY STUDIOS, ОСНОВАННАЯ В
                        САНКТ-ПЕТЕРБУРГЕ В 2022 ГОДУ, СОЗДАЛА СООБЩЕСТВО
                        ХУДОЖНИКОВ И АГЕНТОВ, КОТОРЫЕ ФОКУСИРОВАНЫ НА
                        ДИСЦИПЛИНАХ ИЗГОТОВЛЕНИЯ ИМИДЖА, УКЛАДКИ, ПРИЧЕСОК,
                        МАКИЯЖА, КАСТИНГА И ТВОРЧЕСКОГО НАПРАВЛЕНИЯ.
                    </Ru>
                </div>
                <div style={{ marginTop: "1em" }} className={styles.Text}>
                    <En>
                        BEYOND DAY-TO-DAY MANAGEMENT AND REPRESENTATION, YY
                        STUDIOS WORKS WITH THEIR ARTISTS AND CLIENTS ON PROJECTS
                        OF ALL TYPES INCLUDING BRAND AND PRODUCT DEVELOPMENT,
                        IMAGE LICENSING, EXHIBITIONS AND BOOK PUBLISHING.
                    </En>
                    <Ru>
                        ПОМИМО ПОВСЕДНЕВНОГО УПРАВЛЕНИЯ И ПРЕДСТАВИТЕЛЬСТВА, YY
                        STUDIOS РАБОТАЕТ СО СВОИМИ ХУДОЖНИКАМИ И КЛИЕНТАМИ ПО
                        ПРОЕКТАМ ВСЕХ ТИПОВ, ВКЛЮЧАЯ РАЗРАБОТКУ БРЕНДА И
                        ПРОДУКЦИИ, ЛИЦЕНЗИРОВАНИЕ ИЗОБРАЖЕНИЙ, ВЫСТАВКИ И
                        ИЗДАНИЕ КНИГ.
                    </Ru>
                </div>
            </div>

            <div className={styles.Column}>
                <div className={styles.Title}>
                    <En>SOCIAL MEDIA</En>
                    <Ru>СОЦСЕТИ</Ru>
                </div>
                <a
                    href="https://instagram.com/yy_studios"
                    target="_blank"
                    rel="noreferrer">
                    <div className={styles.Link}>INSTAGRAM</div>
                </a>
                <a
                    href="https://t.me/yy_studios"
                    target="_blank"
                    rel="noreferrer">
                    <div className={styles.Link}>TELEGRAM</div>
                </a>
            </div>
            <div className={styles.Column}>
                <div className={styles.Title}>
                    <En>GLOBAL ENQUIRES</En>
                    <Ru>ГЛОБАЛЬНЫЕ ЗАПРОСЫ</Ru>
                </div>
                <a
                    href="mailto:info@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    <div className={styles.Link}>INFO@YY-STUDIOS.RU</div>
                </a>
                <a href="tel:+79824500926">
                    <div className={styles.Link}>+7 (982) 450-09-26</div>
                </a>
                <div className={styles.Text}>
                    <En>SERGEY</En>
                    <Ru>СЕРГЕЙ</Ru>
                </div>

                <div className={styles.Title}>
                    <En>BOOKING IN MOSCOW</En>
                    <Ru>БРОНИРОВАНИЕ В МОСКВЕ</Ru>
                </div>
                <a
                    href="mailto:msc@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    <div className={styles.Link}>MSC@YY-STUDIOS.RU</div>
                </a>

                <div className={styles.Title}>
                    <En>BOOKING IN SAINT-PETERSBURG</En>
                    <Ru>БРОНИРОВАНИЕ В САНКТ-ПЕТЕРБУРГЕ</Ru>
                </div>
                <a
                    href="mailto:sp@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    <div className={styles.Link}>SP@YY-STUDIOS.RU</div>
                </a>

                <div className={styles.Title}>
                    <En>FOR PARTICIPANTS</En>
                    <Ru>ДЛЯ УЧАСТНИКОВ</Ru>
                </div>
                <a
                    href="mailto:casting@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    <div className={styles.Link}>CASTING@YY-STUDIOS.RU</div>
                </a>
            </div>
        </div>
    )
}

export default Info
