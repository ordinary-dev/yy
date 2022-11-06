import type { NextPage } from "next"
import { Ru, En } from "lib/interpreter"
import StyledLink from "lib/link"
import Meta from "lib/meta"
import styles from "styles/info.module.css"

const Contacts: NextPage = () => {
    return (
        <div className={styles.Info}>
            <Meta title="Contacts" />
            <div className={styles.Column}>
                <div className={styles.Title + " " + styles.FirstTitle}>
                    <En>CONTACTS</En>
                    <Ru>КОНТАКТЫ</Ru>
                </div>
                <div className={styles.Text}>
                    <En>SERGEY</En>
                    <Ru>СЕРГЕЙ</Ru>
                </div>
                <a href="tel:+79824500926">
                    <StyledLink light>+7 (982) 450-09-26</StyledLink>
                </a>
                <a
                    href="mailto:info@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    <StyledLink light>INFO@YY-STUDIOS.RU</StyledLink>
                </a>

                <div className={styles.Title}>
                    <En>FOR PARTICIPANTS</En>
                    <Ru>ДЛЯ УЧАСТНИКОВ</Ru>
                </div>
                <a
                    href="mailto:casting@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    <StyledLink light>CASTING@YY-STUDIOS.RU</StyledLink>
                </a>

                <div className={styles.Title}>
                    <En>SOCIAL MEDIA</En>
                    <Ru>СОЦСЕТИ</Ru>
                </div>
                <a
                    href="https://instagram.com/yy_studios"
                    target="_blank"
                    rel="noreferrer">
                    <StyledLink light>INSTAGRAM</StyledLink>
                </a>
                <a
                    href="https://t.me/yy_studios"
                    target="_blank"
                    rel="noreferrer">
                    <StyledLink light>TELEGRAM</StyledLink>
                </a>
            </div>
        </div>
    )
}

export default Contacts
