import { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/router"
import Logo from "./logo"
import Controls from "./controls"
import LocaleSwitcher from "./locale"
import MainTab from "./tabs/main"
import SecondaryTab from "./tabs/secondary"
import Separator from "./separator"
import styles from "./index.module.css"

const Menu = (props: { children: ReactNode }) => {
    // Used in mobile version,
    // Has no effect on a large screen
    const [isOpen, setIsOpen] = useState(false)

    // Menu has 2 tabs
    // 1: artists, about and contacts
    // 2: current artist
    const [showFirstTab, setShowFirstTab] = useState(true)

    // Hides menu and switches tabs when moving to another page
    const router = useRouter()
    useEffect(() => {
        setIsOpen(false)
        setShowFirstTab(!router.asPath.startsWith("/artists"))
    }, [router.asPath])

    // The height of the link container.
    // It also acts as a background for the menu.
    // Min-height: fit-content.
    const linkStyle = isOpen
        ? {
              height: "100vh",
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
                    <MainTab isVisible={showFirstTab} isMenuOpen={isOpen} />

                    <SecondaryTab
                        onReturn={() => setShowFirstTab(true)}
                        isMenuOpen={isOpen}
                        isVisible={!showFirstTab}
                    />

                    <Separator isVisible={isOpen} />

                    <div className={styles.Space}></div>

                    <LocaleSwitcher forceVisibility={isOpen} />
                </div>
            </div>
            <div className={styles.FakeContainer}></div>
            {props.children}
        </div>
    )
}

export default Menu
