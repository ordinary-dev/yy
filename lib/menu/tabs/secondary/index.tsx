import { useRouter } from "next/router"
import { En, Ru } from "lib/interpreter"
import StyledLink from "lib/link"

// Menu button
const SecondaryTab = (props: {
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

export default SecondaryTab
