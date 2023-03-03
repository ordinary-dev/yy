import "@fontsource/montserrat/400.css"
import "@fontsource/montserrat/300.css"
import "@fontsource/montserrat/200.css"
import type { AppProps } from "next/app"
import Head from "next/head"
import { SWRConfig } from "swr"
import Shynet from "next-shynet"
import Menu from "lib/menu"
import "styles/globals.css"

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <SWRConfig
            value={{
                refreshInterval: 60000,
                fetcher: (resource, init) =>
                    fetch(resource, init).then((res) => res.json()),
            }}>
            <Head>
                <Favicons />
            </Head>
            <Shynet scriptSrc="https://stats.altweb.tech/ingress/494db2b8-6ed0-4bb2-b7a6-d2fb9b63a9fd/script.js" />
            <Menu>
                <Component {...pageProps} />
            </Menu>
        </SWRConfig>
    )
}

const Favicons = () => (
    <>
        <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
        />
        <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#603cba" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
    </>
)

export default MyApp
