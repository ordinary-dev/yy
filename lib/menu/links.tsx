import { useRouter } from "next/router"
import { useEffect, useState, ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"

import { Ru, En } from "lib/interpreter"
import styles from "./links.module.css"
import Logo from "public/logo.png"

export const Links = () => {
    // Get current path
    const router = useRouter()
    const [path, setPath] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (router.isReady) setPath(router.asPath)
    }, [router.isReady, router.asPath])

    return (
        <>
            <Link href="/" passHref>
                <a>
                    <div className={styles.Logo}>
                        <Image
                            src={Logo}
                            alt="Logo"
                            layout="fill"
                            objectFit="contain"
                        />
                    </div>
                </a>
            </Link>
            <div className={styles.MainLinks}>
                <HLink href="/artists" currentPath={path}>
                    <Ru>ТАЛАНТЫ</Ru>
                    <En>ARTISTS</En>
                </HLink>
                <HLink href="/info" currentPath={path}>
                    <Ru>ИНФО</Ru>
                    <En>INFO</En>
                </HLink>
            </div>
            <Locale />
        </>
    )
}

const HLink = (props: {
    children: ReactNode
    href: string
    currentPath: string | undefined
}) => {
    // Link to current page
    if (props.currentPath === props.href)
        return (
            <div className={styles.ActiveLink}>
                {props.children}
                <div></div>
            </div>
        )

    // Link to another page
    return (
        <div className={styles.Link}>
            <Link href={props.href} passHref>
                <a>{props.children}</a>
            </Link>
            <div></div>
        </div>
    )
}

const Locale = () => {
    const router = useRouter()
    const { pathname, asPath, query } = router

    const setRu = () => {
        router.push({ pathname, query }, asPath, { locale: "ru" })
    }

    const setEn = () => {
        router.push({ pathname, query }, asPath, { locale: "en" })
    }

    if (router.locale === "ru")
        return (
            <div className={styles.Lang}>
                RU/
                <div className={styles.Link} onClick={setEn}>
                    EN
                </div>
            </div>
        )
    else
        return (
            <div className={styles.Lang}>
                <div className={styles.Link} onClick={setRu}>
                    RU
                </div>
                /EN
            </div>
        )
}
