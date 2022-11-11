import useSWR from "swr"
import { useRouter } from "next/router"
import { En, Ru } from "lib/interpreter"
import StyledLink from "lib/link"
import { ArtistsAPI } from "pages/api/artists"

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

    // Load list of artists
    const { data, error } = useSWR<ArtistsAPI, Error>("/api/artists")
    if (error || !data || !data.artists) return <></>

    // Get the url of selected artist
    if (!router.query.role || !router.query.name) return <></>

    const roleUrl = router.query.role.toString()
    const nameUrl = router.query.name.toString()

    // Find artist
    const artist = data.artists.filter(
        v => v.role.url === roleUrl && v.person.url === nameUrl
    )[0]
    if (!artist) return <></>

    return (
        <>
            <p>
                <En>{artist.role.nameEn.toUpperCase()}</En>
                <Ru>{artist.role.nameRu.toUpperCase()}</Ru>
            </p>
            <p>
                <En>{artist.person.nameEn.toUpperCase()}</En>
                <Ru>{artist.person.nameRu.toUpperCase()}</Ru>
            </p>
        </>
    )
}

export default SecondaryTab
