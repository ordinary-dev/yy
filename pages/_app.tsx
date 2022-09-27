import '../styles/globals.css'
import Header from '../lib/header'
import '@fontsource/montserrat'
import type { AppProps } from 'next/app'


function MyApp({ Component, pageProps }: AppProps) {
    return <div className={ "Container" }>
        <Header />
        <div className={ "PageContainer" }>
            <Component {...pageProps} />
        </div>
    </div>
}

export default MyApp
