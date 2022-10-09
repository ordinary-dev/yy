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
            <div className={styles.MainColumn}>
                <div className={styles.Title}>
                    <En>ABOUT</En>
                    <Ru>О НАС</Ru>
                </div>
                <div className={styles.Text}>
                    <En>
                        YY STUDIOS IS A FULL SERVICE AND TALENT REPRESENTATION
                        AGENCY, A MODERN REPRESENTATIVE, ABLE TO SATISFY ALL THE
                        NEEDS OF THE ARTIST AND THE CLIENT. THE AGENCY WAS
                        CREATED TO OFFER AN ALTERNATIVE PLATFORM FOR
                        SELF-EXPRESSION SHOWING ARTISTS IN THE CONTEXT OF A
                        MODERN PHOTOGRAPHIC GENRE ORIGINING IN RUSSIA.
                    </En>
                    <Ru>
                        YY STUDIOS - ЭТО АГЕНТСТВО ПОЛНОГО ЦИКЛА И РЕПРЕЗЕНТАЦИИ
                        ТАЛАНТОВ, СОВРЕМЕННЫЙ ПРЕДСТАВИТЕЛЬ, СПОСОБНЫЙ
                        УДОВЛЕТВОРИТЬ ВСЕ ПОТРЕБНОСТИ ХУДОЖНИКА И КЛИЕНТА.
                        АГЕНТСТВО БЫЛО СОЗДАНО, ЧТОБЫ ПРЕДЛОЖИТЬ АЛЬТЕРНАТИВНУЮ
                        ПЛАТФОРМУ ДЛЯ САМОВЫРАЖЕНИЯ, ДЕМОНСТРИРУЯ ХУДОЖНИКОВ В
                        КОНТЕКСТЕ СОВРЕМЕННОГО ФОТОГРАФИЧЕСКОГО ЖАНРА,
                        ЗАРОЖДАЮЩЕГОСЯ В РОССИИ.
                    </Ru>
                </div>
            </div>

            <div className={styles.Column}>
                <div className={styles.Title}>
                    <En>CONTACT</En>
                    <Ru>КОНТАКТЫ</Ru>
                </div>
                <div className={styles.Text}>
                    <En>SERGEY</En>
                    <Ru>СЕРГЕЙ</Ru>
                </div>
                <a href="tel:+79824500926">
                    <div className={styles.Link}>+7 (982) 450-09-26</div>
                </a>
                <a
                    href="mailto:info@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    <div className={`${styles.Link} ${styles.MainLink}`}>
                        INFO@YY-STUDIOS.RU
                    </div>
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
        </div>
    )
}

export default Info
