import useSWR from "swr"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState, useEffect } from "react"
import { Role } from "@prisma/client"
import StyledLink from "lib/link"
import { Ru, En } from "lib/interpreter"
import styles from "./artists.module.css"
import { ArtistsAPIGoodResponse, ArtistWithExtras } from "pages/api/artists"

const Artists = () => {
    const [isOpen, setIsOpen] = useState(false)

    // Variables needed to track page switching
    const router = useRouter()

    // This function is run every time the url changes.
    // It shows the menu if the user is viewing the artist's page, and hides it otherwise.
    useEffect(() => {
        if (router.isReady) {
            setIsOpen(router.asPath.startsWith("/artists"))
        }
    }, [router.isReady, router.asPath])

    return (
        <div onClick={() => setIsOpen(!isOpen)} className={styles.artists}>
            <StyledLink
                isActive={isOpen && !router.asPath.startsWith("/artists")}>
                <Ru>ТАЛАНТЫ</Ru>
                <En>ARTISTS</En>
            </StyledLink>
            <Roles isOpen={isOpen} />
        </div>
    )
}

const Roles = ({ isOpen }: { isOpen: boolean }) => {
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
                                        router.query.role === artist.role.url
                                    }
                                />
                            </>
                        )
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
}: {
    artists: ArtistWithExtras[]
    role: Role
    isVisible: boolean
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
                            return (
                                <Link
                                    key={artist.person.id}
                                    href={`/artists/${role.url}/${artist.person.url}`}
                                    passHref>
                                    <StyledLink
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
