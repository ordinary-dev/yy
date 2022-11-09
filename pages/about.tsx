import type { NextPage, GetStaticProps } from "next"
import Meta from "lib/meta"
import styles from "styles/info.module.css"

type PageProps = {
    title: string
    description: string
    ourServices: string
    photoProd: string
    artDir: string
    brandContent: string
    artConsultation: string
    casting: string
    artists: string
    eCommerce: string
    retouching: string
}

// Generate locale
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const props: PageProps =
        locale === "en"
            ? {
                  title: "About",
                  description:
                      "YY STUDIOS IS A FULL SERVICE AND TALENT REPRESENTATION AGENCY, A MODERN REPRESENTATIVE, ABLE TO SATISFY ALL THE NEEDS OF THE ARTIST AND THE CLIENT. THE AGENCY WAS CREATED TO OFFER AN ALTERNATIVE PLATFORM FOR SELF-EXPRESSION SHOWING ARTISTS IN THE CONTEXT OF A MODERN PHOTOGRAPHIC GENRE ORIGINING IN RUSSIA.",
                  ourServices: "OUR SERVICES",
                  photoProd: "PHOTO PRODUCTION",
                  artDir: "ART DIRECTION",
                  brandContent: "BRAND CONTENT",
                  artConsultation: "ART CONSULTATION",
                  casting: "CASTING",
                  artists: "ARTISTS MANAGEMENT",
                  eCommerce: "E-COMMERCE",
                  retouching: "RETOUCHING",
              }
            : {
                  title: "О нас",
                  description:
                      "YY STUDIOS - ЭТО АГЕНТСТВО ПОЛНОГО ЦИКЛА И РЕПРЕЗЕНТАЦИИ ТАЛАНТОВ, СОВРЕМЕННЫЙ ПРЕДСТАВИТЕЛЬ, СПОСОБНЫЙ УДОВЛЕТВОРИТЬ ВСЕ ПОТРЕБНОСТИ ХУДОЖНИКА И КЛИЕНТА. АГЕНТСТВО БЫЛО СОЗДАНО, ЧТОБЫ ПРЕДЛОЖИТЬ АЛЬТЕРНАТИВНУЮ ПЛАТФОРМУ ДЛЯ САМОВЫРАЖЕНИЯ, ДЕМОНСТРИРУЯ ХУДОЖНИКОВ В КОНТЕКСТЕ СОВРЕМЕННОГО ФОТОГРАФИЧЕСКОГО ЖАНРА, ЗАРОЖДАЮЩЕГОСЯ В РОССИИ.",
                  ourServices: "НАШИ СЕРВИСЫ",
                  photoProd: "ПРОДАКШН СЪЕМОК",
                  artDir: "АРТ ДИРЕКШН",
                  brandContent: "КОНТЕНТ ДЛЯ БРЕНДОВ",
                  artConsultation: "АРТ КОНСУЛЬТАЦИИ",
                  casting: "КАСТИНГ МОДЕЛЕЙ",
                  artists: "БУКИНГ ТАЛАНТОВ",
                  eCommerce: "E-COMMERCE",
                  retouching: "РЕТУШЬ",
              }
    return { props }
}

const About: NextPage<PageProps> = props => {
    return (
        <div className={styles.Info}>
            <Meta title={props.title} />
            <h2>{props.title.toUpperCase()}</h2>
            <p>{props.description}</p>

            <h2>{props.ourServices}</h2>
            <p>{props.photoProd}</p>
            <p>{props.artDir}</p>
            <p>{props.brandContent}</p>
            <p>{props.artConsultation}</p>
            <p>{props.casting}</p>
            <p>{props.artists}</p>
            <p>{props.eCommerce}</p>
            <p>{props.retouching}</p>
        </div>
    )
}

export default About
