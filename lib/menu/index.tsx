import { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/router"
import Logo from "./logo"
import Controls from "./controls"
import Artists from "./artists"
import Info from "./info"
import Locale from "./locale"
import styles from "./index.module.css"

const Layout = (props: { children: ReactNode }) => {
    // Used in mobile version,
    // forced to true in desktop version (with CSS)
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    useEffect(() => {
        setIsOpen(false)
    }, [router.asPath])
    const linkStyle = isOpen
        ? {
              display: "flex",
          }
        : {}
    const separatorStyle = isOpen
        ? {
              display: "block",
          }
        : {}
    return (
        <div className={styles.Container}>
            <div className={styles.Menu}>
                <div className={styles.Main}>
                    <Logo />
                    <Controls
                        isOpen={isOpen}
                        setIsOpen={(v: boolean) => setIsOpen(v)}
                    />
                </div>
                <div style={linkStyle} className={styles.Links}>
                    <Artists />
                    <Info />
                </div>
                <div style={separatorStyle} className={styles.Separator}></div>
                <Locale isVisible={isOpen} />
            </div>
            <div className={styles.FakeContainer}></div>
            {props.children}
        </div>
    )
}

export default Layout
