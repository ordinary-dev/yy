import useSWR from "swr"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState, useEffect } from "react"
import StyledLink from "lib/link"
import { Ru, En } from "lib/interpreter"
import { ArtistsAPI, ArtistRecord } from "pages/api/artists"
import styles from "./artists.module.css"

const Artists = (props: { forceVisibility: boolean }) => {
    const [isOpen, setIsOpen] = useState(false)

    // Variables needed to track page switching
    const router = useRouter()

    // This function is run every time the url changes
    useEffect(() => {
        setIsOpen(false)
    }, [router.asPath])

    const style = props.forceVisibility ? { display: "flex" } : {}

    return (
        <div
            style={style}
            onClick={() => setIsOpen(!isOpen)}
            className={styles.artists}>
            <StyledLink
                isActive={isOpen && !router.asPath.startsWith("/artists")}>
                <Ru>ТАЛАНТЫ</Ru>
                <En>ARTISTS</En>
            </StyledLink>
            <Roles isVisible={isOpen} />
        </div>
    )
}

// List of all roles shown when clicking on the "artists" button
const Roles = ({ isVisible }: { isVisible: boolean }) => {
    const router = useRouter()
    const { data, error } = useSWR<ArtistsAPI, Error>("/api/artists")

    // Several artists can have the same role.
    // This set keeps track of which roles have already been shown.
    const usedRoles = new Set()

    if (isVisible) {
        if (error) return <>ERROR</>
        if (!data) return <>LOADING</>
        if (!data.artists) return <>ERROR</>
        return (
            <>
                {data.artists.map(artist => {
                    // If role wasn't shown before
                    if (!usedRoles.has(artist.role.id)) {
                        // Save role
                        usedRoles.add(artist.role.id)
                        // Return a link to the first person with this role
                        const href = `/artists/${artist.role.url}/${artist.person.url}`
                        return (
                            <>
                                <Link href={href}>
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
                                    artists={
                                        data.artists
                                            ? data.artists.filter(
                                                  v =>
                                                      v.role.id ===
                                                      artist.role.id
                                              )
                                            : []
                                    }
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

    // Section is invisible
    return <></>
}

const People = ({
    artists,
    isVisible,
}: {
    artists: ArtistRecord[]
    isVisible: boolean
}) => {
    const router = useRouter()

    // Several artists can have the same role.
    // This set keeps track of which artists have already been shown.
    const usedPersons = new Set()

    if (isVisible)
        return (
            <>
                {artists.map(artist => {
                    // If artist wasn't shown before
                    if (!usedPersons.has(artist.person.id)) {
                        // Save artist
                        usedPersons.add(artist.person.id)

                        const selectedArtist =
                            router.query.name === artist.person.url
                        return (
                            <Link
                                key={artist.person.id}
                                href={`/artists/${artist.role.url}/${artist.person.url}`}>
                                <StyledLink
                                    key={artist.person.id}
                                    light={!selectedArtist}
                                    isActive={selectedArtist}>
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
                    // Artist was shown before
                    return <></>
                })}
            </>
        )

    // Section is invisible
    return <></>
}

export default Artists
