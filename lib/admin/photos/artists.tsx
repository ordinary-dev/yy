import { FormEvent } from "react"
import { Artist, Person, Role } from "@prisma/client"
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import styles from "./artists.module.css"

const Artists = (props: {
    id: number
    artists: (Artist & { role: Role; person: Person })[]
    roles: Role[]
    people: Person[]
    onChange: () => void
}) => {
    return (
        <div className={styles.Artists}>
            {props.artists.map((artist) => (
                <div className={styles.Entry} key={artist.id}>
                    <div>
                        {artist.role.nameEn}: {artist.person.nameEn}
                    </div>
                    <button
                        onClick={() => deleteArtist(artist.id, props.onChange)}>
                        <DeleteOutlined />
                    </button>
                </div>
            ))}
            {props.artists.length === 0 && (
                <div>Artists:</div>
            )}
            <form onSubmit={(e) => addArtist(e, props.id, props.onChange)}>
                <select name="artistRole">
                    {props.roles.map((role) => (
                        <option key={role.id} value={role.id}>
                            {role.nameEn}
                        </option>
                    ))}
                </select>
                <select name="person">
                    {props.people.map((person) => (
                        <option key={person.id} value={person.id}>
                            {person.nameEn}
                        </option>
                    ))}
                </select>
                <button type="submit">
                    <PlusOutlined />
                </button>
            </form>
        </div>
    )
}

const deleteArtist = async (id: number, onSuccess: () => void) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ artistId: id }),
    }
    const response = await fetch("/api/artists", options)
    if (response.status === 200) onSuccess()
}

interface ArtistForm extends HTMLFormElement {
    person: HTMLSelectElement
    artistRole: HTMLSelectElement
}

const addArtist = async (
    e: FormEvent,
    photoId: number,
    onSuccess: () => void
) => {
    e.preventDefault()
    const target = e.target as ArtistForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            personId: Number(target.person.value),
            roleId: Number(target.artistRole.value),
            photoId: photoId,
        }),
    }
    const response = await fetch("/api/artists", options)
    if (response.status === 200) onSuccess()
}

export default Artists
