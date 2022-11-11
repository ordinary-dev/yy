import { useRouter } from "next/router"
import { En, Ru } from "lib/interpreter"
import Artists from "./artists"
import PageLink from "./link"

// Artists. about and contacts
const MainTab = (props: { isVisible: boolean; isMenuOpen: boolean }) => {
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

export default MainTab
