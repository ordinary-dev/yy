import { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/router"
import Logo from "./logo"
import Controls from "./controls"
import Locale from "./locale"
import MainTab from "./tabs/main"
import SecondaryTab from "./tabs/secondary"
import styles from "./index.module.css"

const Menu = (props: { children: ReactNode }) => {
    // Used in mobile version,
    // Has no effect on a large screen
    const [isOpen, setIsOpen] = useState(false)

    // Menu has 2 tabs
    // 1: artists, about and contacts
    // 2: current artist
    const [showFirstTab, setShowFirstTab] = useState(true)

    const router = useRouter()

    useEffect(() => {
        setIsOpen(false)
        setShowFirstTab(!router.asPath.startsWith("/artists"))
    }, [router.asPath])

    const linkStyle = isOpen
        ? {
              height: "100vh",
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
                    <SecondaryTab
                        onReturn={() => setShowFirstTab(true)}
                        isMenuOpen={isOpen}
                        isVisible={!showFirstTab}
                    />

                    <MainTab isVisible={showFirstTab} isMenuOpen={isOpen} />

                    <div
                        style={separatorStyle}
                        className={styles.Separator}></div>
                    <div className={styles.Space}></div>
                    <Locale isVisible={isOpen} />
                </div>
            </div>
            <div className={styles.FakeContainer}></div>
            {props.children}
        </div>
    )
}

export default Menu
