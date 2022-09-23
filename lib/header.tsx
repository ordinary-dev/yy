import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import styles from './header.module.css'

const Header = () => {
    // Get current path
    const router = useRouter()
    const [path, setPath] = useState<string|undefined>(undefined)
    useEffect(() => {
        if (router.isReady) setPath(router.asPath)
    }, [router.isReady, router.asPath])

    return (
        <div className={ styles.Container }>
            <Image src="/logo.png" width="103px" height="80px" alt="Logo" />
            <Space />
            <HLink text="ARTISTS" href="/artists" currentPath={ path } />
            <HLink text="HOME" href="/" currentPath={ path } />
            <HLink text="INFO" href="/info" currentPath={ path } />
            <Space />
            <div>RU/EN</div>
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

export default Header
