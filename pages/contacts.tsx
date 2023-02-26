import type { NextPage, GetStaticProps } from "next"
import StyledLink from "lib/link"
import Meta from "lib/meta"
import styles from "styles/info.module.css"

type PageProps = {
    title: string
    name: string
    forParticipants: string
    socialMedia: string
}

// Generate the required locale
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const props: PageProps =
        locale === "en"
            ? {
                  title: "Contacts",
                  name: "SERGEY",
                  forParticipants: "FOR PARTICIPANTS",
                  socialMedia: "SOCIAL MEDIA",
              }
            : {
                  title: "Контакты",
                  name: "СЕРГЕЙ",
                  forParticipants: "ДЛЯ УЧАСТНИКОВ",
                  socialMedia: "СОЦСЕТИ",
              }
    return { props }
}

const Contacts: NextPage<PageProps> = (props) => (
    <div className={styles.Info}>
        <Meta title={props.title} />

        <h1>{props.title.toUpperCase()}</h1>
        <p>{props.name}</p>
        <a href="tel:+79824500926">
            <StyledLink>+7 (982) 450-09-26</StyledLink>
        </a>
        <a href="mailto:info@yy-studios.ru" target="_blank" rel="noreferrer">
            <StyledLink>INFO@YY-STUDIOS.RU</StyledLink>
        </a>

        <h1>{props.forParticipants}</h1>
        <a href="mailto:casting@yy-studios.ru" target="_blank" rel="noreferrer">
            <StyledLink>CASTING@YY-STUDIOS.RU</StyledLink>
        </a>

        <h1>{props.socialMedia}</h1>
        <a href="https://instagram.com/yy_studios" target="_blank" rel="noreferrer">
            <StyledLink>INSTAGRAM</StyledLink>
        </a>
        <a href="https://t.me/yy_studios" target="_blank" rel="noreferrer">
            <StyledLink>TELEGRAM</StyledLink>
        </a>
    </div>
)

export default Contacts
