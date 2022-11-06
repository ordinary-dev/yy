import { useState, useEffect, ReactNode } from "react"
import { useRouter } from "next/router"
import { En, Ru } from "lib/interpreter"
import Logo from "./logo"
import Controls from "./controls"
import Artists from "./artists"
import PageLink from "./link"
import Locale from "./locale"
import styles from "./index.module.css"
import StyledLink from "lib/link"

//
// Written in a desperate attempt to get everything done on time.
// TODO: refactor this mess
//

const Layout = (props: { children: ReactNode }) => {
    // Used in mobile version,
    // forced to true in desktop version (with CSS)
    const [isOpen, setIsOpen] = useState(false)

    const [isArtOpen, setIsArtOpen] = useState(false)
    const [showMainMenu, setShowMainMenu] = useState(true)
    const router = useRouter()

    useEffect(() => {
        setIsOpen(false)
        setShowMainMenu(!router.asPath.startsWith("/artists"))
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

    const mmbtn = isOpen && !showMainMenu ? { display: "block" } : {}
    const isArtistsVisible = isOpen || router.asPath.startsWith("/artists")
    const isAboutVisible =
        (isOpen && showMainMenu) || router.asPath.startsWith("/about")
    const isContactsVisible =
        (isOpen && showMainMenu) || router.asPath.startsWith("/contacts")

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
                    {!showMainMenu && (
                        <div
                            onClick={() => {
                                setShowMainMenu(true)
                                setIsArtOpen(false)
                            }}
                            style={mmbtn}>
                            <StyledLink>MENU</StyledLink>
                        </div>
                    )}

                    <Artists
                        isOpen={isArtOpen}
                        setIsOpen={(v: boolean) => setIsArtOpen(v)}
                        forcedVisibility={isArtistsVisible}
                        showTitle={showMainMenu && isOpen}
                        showMainMenu={showMainMenu}
                        showAllLinks={showMainMenu}
                    />

                    {showMainMenu && (
                        <PageLink
                            href="/about"
                            forcedVisibility={isAboutVisible}>
                            <En>ABOUT</En>
                            <Ru>О НАС</Ru>
                        </PageLink>
                    )}

                    {showMainMenu && (
                        <PageLink
                            href="/contacts"
                            forcedVisibility={isContactsVisible}>
                            <En>CONTACTS</En>
                            <Ru>КОНТАКТЫ</Ru>
                        </PageLink>
                    )}

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

export default Layout
