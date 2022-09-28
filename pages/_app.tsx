import '../styles/globals.css'
import Header from '../lib/header'
import '@fontsource/montserrat/400.css'
import '@fontsource/montserrat/200.css'
import '@fontsource/montserrat/300.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
    return <div className={ "Container" }>
        <Head>
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#603cba" />
            <meta name="msapplication-TileColor" content="#603cba" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
        <Header />
        <div className={ "PageContainer" }>
            <Component {...pageProps} />
        </div>
    </div>
}

export default MyApp
