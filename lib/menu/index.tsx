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
                    <SecondTab
                        onReturn={() => setShowFirstTab(true)}
                        isMenuOpen={isOpen}
                        isVisible={!showFirstTab}
                    />

                    <FirstTab isVisible={showFirstTab} isMenuOpen={isOpen} />

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

// About and contacts
const FirstTab = (props: { isVisible: boolean; isMenuOpen: boolean }) => {
    const router = useRouter()

    const isAboutVisible =
        props.isMenuOpen || router.asPath.startsWith("/about")
    const isContactsVisible =
        props.isMenuOpen || router.asPath.startsWith("/contacts")

    if (props.isVisible)
        return (
            <>
                <Artists forcedVisibility={props.isMenuOpen} />
                <PageLink href="/about" forcedVisibility={isAboutVisible}>
                    <En>ABOUT</En>
                    <Ru>О НАС</Ru>
                </PageLink>
                <PageLink href="/contacts" forcedVisibility={isContactsVisible}>
                    <En>CONTACTS</En>
                    <Ru>КОНТАКТЫ</Ru>
                </PageLink>
            </>
        )
    return <></>
}

// Menu button
const SecondTab = (props: {
    onReturn: () => void
    isMenuOpen: boolean
    isVisible: boolean
}) => {
    if (props.isVisible)
        return (
            <>
                <MenuButton
                    onClick={props.onReturn}
                    isVisible={props.isMenuOpen}
                />
                <CurrentArtist />
            </>
        )
    return <></>
}

// Button that opens the first tab
const MenuButton = (props: { onClick: () => void; isVisible: boolean }) => {
    return (
        <div
            onClick={props.onClick}
            style={props.isVisible ? { display: "block" } : {}}>
            <StyledLink>
                <En>MENU</En>
                <Ru>МЕНЮ</Ru>
            </StyledLink>
        </div>
    )
}

// Shows current artist
const CurrentArtist = () => {
    const router = useRouter()
    if (!router.query.role || !router.query.name) return <></>

    const fmt = (s: string) => s.replace(/-/g, " ").toUpperCase()

    const role = fmt(router.query.role.toString())
    const name = fmt(router.query.name.toString())

    return (
        <>
            <p>{role}</p>
            <p>{name}</p>
        </>
    )
}

export default Menu
