import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './header.module.css'
import { MenuOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Logo from '../../public/logo.png'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    // Get current path
    const router = useRouter()
    const [path, setPath] = useState<string|undefined>(undefined)
    useEffect(() => {
        if (router.isReady) setPath(router.asPath)
    }, [router.isReady, router.asPath])

    const t = (en: string, ru: string) => {
        if (router.locale == 'ru') return ru
        return en
    }

    return (
        <div className={ styles.Container }>
            <div className={ styles.ImageGuard } >
                <Image src={ Logo }
                       width="50px"
                       height="40px"
                       alt="Logo"
                       layout="fixed" />
            </div>
            <Space />
            <HLink text={ t('ARTISTS', 'ТАЛАНТЫ') } href="/artists" currentPath={ path } />
            <HLink text={ t('HOME', 'ГЛАВНАЯ')  } href="/" currentPath={ path } />
            <HLink text={ t('INFO', 'ИНФО')  } href="/info" currentPath={ path } />
            <Space />
            <Locale />
            <Menu isOpen={ isOpen }
                  open={ () => setIsOpen(true) }
                  close={ () => setIsOpen(false) } />
            <FullscreenMenu isOpen={ isOpen } path={ path } />
        </div>
    )
}

const HLink = (props: { text: string, href: string, currentPath: string|undefined } ) => {
    // Link to current page
    if (props.currentPath === props.href) return (
        <div className={ styles.ActiveLink }>{ props.text }</div>
    )

    // Link to another page
    return (
        <Link href={ props.href } passHref>
            <a className={ styles.Link }>{ props.text }</a>
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
