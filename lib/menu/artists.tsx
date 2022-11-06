import useSWR from "swr"
import { useRouter } from "next/router"
import Link from "next/link"
import { useEffect } from "react"
import { Role } from "@prisma/client"
import StyledLink from "lib/link"
import { Ru, En } from "lib/interpreter"
import styles from "./artists.module.css"
import { ArtistsAPIGoodResponse, ArtistWithExtras } from "pages/api/artists"

const Artists = (props: {
    isOpen: boolean
    setIsOpen: (arg0: boolean) => void
    forcedVisibility: boolean
    showTitle: boolean
    showMainMenu: boolean
    showAllLinks: boolean
}) => {
    // Variables needed to track page switching
    const router = useRouter()

    // This function is run every time the url changes.
    // It shows the menu if the user is viewing the artist's page, and hides it otherwise.
    useEffect(() => {
        if (router.isReady) {
            props.setIsOpen(router.asPath.startsWith("/artists"))
        }
    }, [router.isReady, router.asPath])

    const titleStyle = props.showTitle ? { display: "block" } : {}
    const style = props.forcedVisibility ? { display: "flex" } : {}

    return (
        <div
            style={style}
            onClick={() => props.setIsOpen(!props.isOpen)}
            className={styles.artists}>
            {props.showMainMenu && (
                <div style={titleStyle}>
                    <StyledLink
                        isActive={
                            props.isOpen &&
                            !router.asPath.startsWith("/artists")
                        }>
                        <Ru>ТАЛАНТЫ</Ru>
                        <En>ARTISTS</En>
                    </StyledLink>
                </div>
            )}
            {(!props.showTitle || props.isOpen) && (
                <Roles
                    isOpen={props.isOpen}
                    showAllLinks={props.showAllLinks}
                />
            )}
        </div>
    )
}

const Roles = ({
    isOpen,
    showAllLinks,
}: {
    isOpen: boolean
    showAllLinks: boolean
}) => {
    const router = useRouter()
    const { data, error } = useSWR<ArtistsAPIGoodResponse, Error>(
        "/api/artists"
    )

    const usedRoles = new Set()

    if (isOpen) {
        if (error) return <div>ERROR</div>
        if (!data) return <div>LOADING</div>
        return (
            <>
                {data.artists.map(artist => {
                    // If role wasn't shown before
                    if (!usedRoles.has(artist.role.url)) {
                        // Save role
                        usedRoles.add(artist.role.url)
                        // Return a link to the first person with this role
                        if (
                            router.query.role === artist.role.url ||
                            showAllLinks
                        )
                            return (
                                <>
                                    <Link
                                        href={`/artists/${artist.role.url}/${artist.person.url}`}>
                                        <StyledLink light>
                                            <En>
                                                {artist.role.nameEn.toUpperCase()}
                                            </En>
                                            <Ru>
                                                {artist.role.nameRu.toUpperCase()}
                                            </Ru>
                                        </StyledLink>
                                    </Link>
                                    <People
                                        artists={data.artists}
                                        role={artist.role}
                                        isVisible={
                                            router.query.role ===
                                            artist.role.url
                                        }
                                        showAllLinks={showAllLinks}
                                    />
                                </>
                            )
                        return <></>
                    }
                    // Return nothing if the role was already shown
                    return <></>
                })}
            </>
        )
    }
    return <></>
}

const People = ({
    artists,
    role,
    isVisible,
    showAllLinks,
}: {
    artists: ArtistWithExtras[]
    role: Role
    isVisible: boolean
    showAllLinks: boolean
}) => {
    const usedPersons = new Set()
    const router = useRouter()
    if (isVisible)
        return (
            <>
                {artists.map(artist => {
                    if (artist.role.id === role.id) {
                        if (!usedPersons.has(artist.person.id)) {
                            usedPersons.add(artist.person.id)
                            if (
                                router.query.name === artist.person.url ||
                                showAllLinks
                            )
                                return (
                                    <Link
                                        key={artist.person.id}
                                        href={`/artists/${role.url}/${artist.person.url}`}
                                        passHref>
                                        <StyledLink
                                            key={artist.person.id}
                                            light
                                            isActive={
                                                router.query.name ===
                                                artist.person.url
                                            }>
                                            <En>
                                                {artist.person.nameEn.toUpperCase()}
                                            </En>
                                            <Ru>
                                                {artist.person.nameRu.toUpperCase()}
                                            </Ru>
                                        </StyledLink>
                                    </Link>
                                )
                        }
                    }
                    return <></>
                })}
            </>
        )
    return <></>
}

export default Artists
