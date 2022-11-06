import type { NextPage } from "next"
import { ReactNode } from "react"
import { Ru, En } from "lib/interpreter"
import Meta from "lib/meta"
import styles from "styles/info.module.css"

const About: NextPage = () => {
    return (
        <div className={styles.Info}>
            <Meta title="About" />
            <div className={styles.Column}>
                <div className={styles.Title + " " + styles.FirstTitle}>
                    <En>ABOUT</En>
                    <Ru>О НАС</Ru>
                </div>
                <Text>
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
                </Text>
            </div>
            <div className={styles.Column}>
                <div className={styles.Title}>
                    <En>OUR SERVICES</En>
                    <Ru>НАШИ СЕРВИСЫ</Ru>
                </div>
                <Text>
                    <En>PHOTO PRODUCTION</En>
                    <Ru>ФОТОПРОИЗВОДСТВО</Ru>
                </Text>

                <Text>
                    <En>ART DIRECTION</En>
                    <Ru>АРТ-ДИРЕКЦИЯ</Ru>
                </Text>

                <Text>
                    <En>BRAND CONTENT</En>
                    <Ru>СОДЕРЖАНИЕ БРЕНДА</Ru>
                </Text>

                <Text>
                    <En>ART CONSULTATION</En>
                    <Ru>АРТ КОНСУЛЬТАЦИЯ</Ru>
                </Text>

                <Text>
                    <En>CASTING</En>
                    <Ru>КАСТИНГ</Ru>
                </Text>

                <Text>
                    <En>ARTISTS MANAGMENT</En>
                    <Ru>МЕНЕДЖМЕНТ АРТИСТОВ</Ru>
                </Text>

                <Text>
                    <En>E-COMMERCE</En>
                    <Ru>ЭЛЕКТРОННАЯ КОММЕРЦИЯ</Ru>
                </Text>

                <Text>
                    <En>RETOUCHING</En>
                    <Ru>РЕТУШЬ</Ru>
                </Text>
            </div>
        </div>
    )
}

const Text = ({ children }: { children: ReactNode }) => {
    return <div className={styles.Text}>{children}</div>
}

export default About
