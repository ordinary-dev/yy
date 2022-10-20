import { MenuOutlined, CloseCircleOutlined } from "@ant-design/icons"
import { useState, useEffect } from "react"
import { useRouter } from "next/router"

import { Links } from "./body"
import styles from "./mobile.module.css"

export const MobileMenu = () => {
    const [isVisible, setIsVisible] = useState(false)

    // Close menu if path changed
    const router = useRouter()
    useEffect(() => {
        setIsVisible(false)
    }, [router.asPath])

    if (!isVisible)
        return (
            <div className={styles.Container}>
                <div
                    onClick={() => setIsVisible(true)}
                    className={styles.Button}>
                    <MenuOutlined />
                </div>
            </div>
        )

    return (
        <div className={styles.Container}>
            <div onClick={() => setIsVisible(false)} className={styles.Button}>
                <CloseCircleOutlined />
            </div>
            <div className={styles.Background}>
                <Links />
            </div>
        </div>
    )
}
