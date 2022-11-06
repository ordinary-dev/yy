import Script from "next/script"
import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect } from "react"
import styles from "./tracking.module.css"

// Shynet - privacy-friendly web analytics
// https://github.com/milesmcc/shynet
const Tracking = () => {
    const router = useRouter()

    const sendData = () => {
        if (window["Shynet"]) window["Shynet"].newPageLoad()
    }

    useEffect(() => {
        sendData()
    }, [router.asPath, router.locale])

    return (
        <div className={styles.hidden}>
            <Script
                src="https://stats.altweb.tech/ingress/494db2b8-6ed0-4bb2-b7a6-d2fb9b63a9fd/script.js"
                onLoad={() => sendData()}
            />
            <noscript>
                <Image
                    width={1}
                    height={1}
                    src="https://stats.altweb.tech/ingress/494db2b8-6ed0-4bb2-b7a6-d2fb9b63a9fd/pixel.gif"
                    unoptimized={true}
                    alt="Pixel"
                />
            </noscript>
        </div>
    )
}

export default Tracking

declare global {
    interface Window {
        Shynet: any
    }
}
