import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, ReactNode } from 'react'
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons'

import { Ru, En } from 'lib/interpreter'
import styles from './header.module.css'
import Logo from 'public/logo.png'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    // Get current path
    const router = useRouter()
    const [path, setPath] = useState<string|undefined>(undefined)
    useEffect(() => {
        if (router.isReady) setPath(router.asPath)
    }, [router.isReady, router.asPath])

    return (
        <div className={ styles.Container }>
            <Link href="/" passHref>
                <a>
                    <Image src={ Logo }
                           width="75px"
                           height="60px"
                           alt="Logo"
                           layout="fixed" />
                </a>
            </Link>
            <Space />
            <div className={ styles.MainLinks }>
                <HLink href="/artists" currentPath={ path }>
                    <Ru>ХУДОЖНИКИ</Ru>
                    <En>ARTISTS</En>
                </HLink>
                <HLink href="/" currentPath={ path }>
                    <Ru>ГЛАВНАЯ</Ru>
                    <En>HOME</En>
                </HLink>
                <HLink href="/info" currentPath={ path }>
                    <Ru>ИНФО</Ru>
                    <En>INFO</En>
                </HLink>
            </div>
            <Space />
            <Locale />
            <Menu isOpen={ isOpen }
                  open={ () => setIsOpen(true) }
                  close={ () => setIsOpen(false) } />
            <FullscreenMenu isOpen={ isOpen } path={ path } />
        </div>
    )
}

const HLink = (props: { children: ReactNode, href: string, currentPath: string|undefined } ) => {
    // Link to current page
    if (props.currentPath === props.href) return (
        <div className={ styles.ActiveLink }>{ props.children }</div>
    )

    // Link to another page
    return (
        <Link href={ props.href } passHref>
            <a className={ styles.Link }>{ props.children }</a>
        </Link>
    )
}

const Space = () => (
    <div className={ styles.Space }></div>
)

const Menu = (props: { isOpen: boolean, open: () => void, close: () => void }) => {
    if (!props.isOpen) return (
        <div className={ styles.Menu } onClick={props.open}>
            <MenuOutlined />
        </div>
    )
    return (
        <div className={ styles.Menu } onClick={props.close}>
            <CloseCircleOutlined />
        </div>
    )
}

const FullscreenMenu = (props: { isOpen: boolean, path: string | undefined }) => {
    if (props.isOpen) return (
        <div className={ styles.FullscreenMenu }>
            <FullscreenLink text="ARTISTS" href="/artists" currentPath={ props.path } />
            <FullscreenLink text="HOME" href="/" currentPath={ props.path } />
            <FullscreenLink text="INFO" href="/info" currentPath={ props.path } />
        </div>
    )

    return <></>
}

const FullscreenLink = (props: { text: string, href: string, currentPath: string|undefined } ) => {
    // Link to current page
    if (props.currentPath === props.href) return <></>

    // Link to another page
    return (
        <Link href={ props.href } passHref>
            <a>
                <div className={ styles.FullscreenLink }>{ props.text }</div>
            </a>
        </Link>
    )
}

const Locale = () => {
    const router = useRouter()
    const { pathname, asPath, query } = router

    const setRu = () => {
        router.push({ pathname, query }, asPath, { locale: 'ru' })
    }

    const setEn = () => {
        router.push({ pathname, query }, asPath, { locale: 'en' })
    }

    if (router.locale === 'ru') return (
        <div className={ styles.Lang }>
            RU/<div className={ styles.Link } onClick={ setEn }>EN</div>
        </div>
    )
    else return (
        <div className={ styles.Lang }>
            <div className={ styles.Link } onClick={ setRu }>RU</div>/EN
        </div>
    )
}

export default Header
