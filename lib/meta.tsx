import { useRouter } from "next/router"
import Head from "next/head"

const Meta = (props: { title?: string }) => {
    const router = useRouter()

    const url = "https://yy-studios.ru"
    let title = "YY Studios"
    if (props.title) title = props.title + " - " + title

    // Generate description
    // Default language is English
    const description =
        router.locale === "ru"
            ? "YY Studios - это агентство полного цикла и репрезентации талантов, современный представитель, способный удовлетворить все потребности художника и клиента"
            : "YY Studios is a full service and talent representation agency, a modern representative, able to satisfy all the needs of the artist and the client"

    const image = "https://yy-studios.ru/preview.jpg"

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <meta property="og:type" content="website" />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:domain" content="yy-studios.ru" />
            <meta property="twitter:url" content={url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Head>
    )
}

export default Meta
