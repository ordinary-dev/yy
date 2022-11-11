import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import { En, Ru } from "lib/interpreter"
import StyledLink from "lib/link"
import Artists from "./artists"

// Artists. about and contacts
const MainTab = (props: { isVisible: boolean; isMenuOpen: boolean }) => {
    if (props.isVisible)
        return (
            <>
                <Artists forceVisibility={props.isMenuOpen} />
                <MyLink href="/about" isMenuOpen={props.isMenuOpen}>
                    <En>ABOUT</En>
                    <Ru>О НАС</Ru>
                </MyLink>
                <MyLink href="/contacts" isMenuOpen={props.isMenuOpen}>
                    <En>CONTACTS</En>
                    <Ru>КОНТАКТЫ</Ru>
                </MyLink>
            </>
        )
    return <></>
}

const MyLink = ({
    href,
    isMenuOpen,
    children,
}: {
    href: string
    isMenuOpen: boolean
    children: ReactNode
}) => {
    // Underline link when page is open
    const router = useRouter()
    const pathsMatch = router.asPath === href

    // Menu items are hidden by default in mobile version.
    // Has no effect on large screens.
    const style = isMenuOpen || pathsMatch ? { display: "block" } : {}

    return (
        <div style={style}>
            <Link href={href}>
                <StyledLink isActive={pathsMatch}>{children}</StyledLink>
            </Link>
        </div>
    )
}

export default MainTab
