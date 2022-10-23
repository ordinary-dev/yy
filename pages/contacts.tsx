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
                <div className={styles.Title}>
                    <En>CONTACTS</En>
                    <Ru>КОНТАКТЫ</Ru>
                </div>
                <div className={styles.Text}>
                    <En>SERGEY</En>
                    <Ru>СЕРГЕЙ</Ru>
                </div>
                <StyledLink href="tel:+79824500926" light>
                    +7 (982) 450-09-26
                </StyledLink>
                <StyledLink
                    href="mailto:info@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer">
                    INFO@YY-STUDIOS.RU
                </StyledLink>

                <div className={styles.Title}>
                    <En>FOR PARTICIPANTS</En>
                    <Ru>ДЛЯ УЧАСТНИКОВ</Ru>
                </div>
                <StyledLink
                    href="mailto:casting@yy-studios.ru"
                    target="_blank"
                    rel="noreferrer"
                    light>
                    CASTING@YY-STUDIOS.RU
                </StyledLink>

                <div className={styles.Title}>
                    <En>SOCIAL MEDIA</En>
                    <Ru>СОЦСЕТИ</Ru>
                </div>
                <StyledLink
                    href="https://instagram.com/yy_studios"
                    target="_blank"
                    rel="noreferrer"
                    light>
                    INSTAGRAM
                </StyledLink>
                <StyledLink
                    href="https://t.me/yy_studios"
                    target="_blank"
                    rel="noreferrer"
                    light>
                    TELEGRAM
                </StyledLink>
            </div>
        </div>
    )
}

export default Contacts
