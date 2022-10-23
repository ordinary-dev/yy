import { useState, FormEvent } from "react"
import Image from "next/image"
import {
    DeleteOutlined,
    SaveOutlined,
    CloudUploadOutlined,
    ExclamationCircleOutlined,
    LoadingOutlined,
} from "@ant-design/icons"
import useSWR, { useSWRConfig } from "swr"
import { Artist, Role, Person } from "@prisma/client"

import { PhotoAPI } from "pages/api/photo"
import { DeleteAPI } from "pages/api/delete"
import { UpdateAPI } from "pages/api/update"
import { UploadAPI } from "pages/api/upload"
import styles from "./photos.module.css"
import Order from "./order"

const ListOfPhotos = () => {
    const photos = useSWR<PhotoAPI, Error>("/api/photo")
    const roles = useSWR("/api/roles")
    const people = useSWR("/api/people")
    const { mutate } = useSWRConfig()

    const updateList = () => {
        mutate("/api/photo")
        mutate("/api/roles")
        mutate("/api/people")
    }

    if (photos.error || roles.error || people.error)
        return <ExclamationCircleOutlined />
    if (!photos.data || !roles.data || !people.data)
        return <LoadingOutlined spin={true} />

    return (
        <div className={styles.Container}>
            <div>List of photos:</div>
            {photos.data.photos.map((photo, index) => (
                <Photo
                    key={index}
                    id={photo.id}
                    ext={photo.ext}
                    descEn={photo.descriptionEn}
                    descRu={photo.descriptionRu}
                    width={photo.width}
                    height={photo.height}
                    order={photo.order}
                    updateList={updateList}
                    size={photo.size}
                    artists={photo.artists}
                    roles={roles.data.roles}
                    people={people.data.people}
                />
            ))}
            <UploadForm updateList={updateList} />
        </div>
    )
}
const Photo = (props: {
    id: number
    ext: string
    height: number
    width: number
    descEn: string | null
    descRu: string | null
    order: number
    updateList: () => void
    size: number
    artists: (Artist & { role: Role; person: Person })[]
    roles: Role[]
    people: Person[]
}) => {
    const [descRu, setDescRu] = useState(props.descRu ? props.descRu : "")
    const [descEn, setDescEn] = useState(props.descEn ? props.descEn : "")

    const maxSize = 150
    const div =
        props.width > props.height
            ? props.width / maxSize
            : props.height / maxSize
    const height = Math.floor(props.height / div)
    const width = Math.floor(props.width / div)

    return (
        <div>
            <div className={styles.Photo}>
                <Image
                    src={`/photos/${props.id}/original.${props.ext}`}
                    width={width}
                    height={height}
                    alt="Uploaded photo"
                    unoptimized={true}
                />
                <div className={styles.Stack}>
                    <input
                        placeholder="English description"
                        value={descEn}
                        onChange={e => setDescEn(e.target.value)}
                        type="text"
                    />
                    <input
                        placeholder="Russian description"
                        value={descRu}
                        onChange={e => setDescRu(e.target.value)}
                        type="text"
                    />
                    <button
                        className={styles.Button}
                        onClick={() => updatePhoto(props.id, descEn, descRu)}>
                        <SaveOutlined /> Save
                    </button>
                    <button
                        className={styles.Button}
                        onClick={() => deletePhoto(props.id, props.updateList)}>
                        <DeleteOutlined /> Delete
                    </button>
                </div>
            </div>

            <div>Format: {props.ext}</div>
            <Warning isVisible={props.ext !== "webp" && props.ext !== "avif"}>
                You use an outdated format!
            </Warning>

            <div>Width: {props.width}</div>
            <Warning isVisible={props.width > 3000}>
                The width is too large!
            </Warning>

            <div>Height: {props.height}</div>
            <Warning isVisible={props.height > 3000}>
                The height is too large!
            </Warning>

            <div>Size: {Math.floor(props.size / 1024)} kbytes</div>
            <Warning isVisible={props.size > 512 * 1024}>
                The image is too big!
            </Warning>

            <div>Artists:</div>
            {props.artists.map(artist => (
                <div key={artist.id}>
                    {artist.role.nameEn}: {artist.person.nameEn}
                    <button
                        onClick={() =>
                            deleteArtist(artist.id, props.updateList)
                        }>
                        Delete
                    </button>
                </div>
            ))}
            {props.artists.length === 0 && (
                <div>I don&apos;t know anything about the authors :(</div>
            )}
            <form onSubmit={e => addArtist(e, props.id, props.updateList)}>
                <select name="role">
                    {props.roles.map(role => (
                        <option key={role.id} value={role.id}>
                            {role.nameEn}
                        </option>
                    ))}
                </select>
                <select name="person">
                    {props.people.map(person => (
                        <option key={person.id} value={person.id}>
                            {person.nameEn}
                        </option>
                    ))}
                </select>
                <input type="submit" value="Add" />
            </form>
            <Order
                id={props.id}
                order={props.order}
                onChange={props.updateList}
            />
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
    role: HTMLSelectElement
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
            roleId: Number(target.role.value),
            photoId: photoId,
        }),
    }
    const response = await fetch("/api/artists", options)
    if (response.status === 200) onSuccess()
}

const Warning = ({
    children,
    isVisible,
}: {
    children: string
    isVisible: boolean
}) => {
    if (isVisible)
        return <div className={styles.Error}>Warning: {children}</div>
    return <></>
}

const updatePhoto = async (id: number, descEn: string, descRu: string) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, descEn, descRu }),
    }
    const response = await fetch("/api/update", options)
    const res: UpdateAPI = await response.json()
    if (!res.ok) console.error("Update failed")
}

const deletePhoto = async (id: number, updateList: () => void) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }
    const response = await fetch("/api/delete", options)
    const res: DeleteAPI = await response.json()
    if (!res.ok) console.error("Can't delete photo")
    updateList()
}

const UploadForm = (props: { updateList: () => void }) => {
    return (
        <>
            <div>Upload new photo</div>
            <form onSubmit={e => handleSubmit(e, props.updateList)}>
                <input
                    type="file"
                    accept="image/png, image/jpeg, image/webp"
                    name="image"
                    required
                />
                <button type="submit" className={styles.Button}>
                    <CloudUploadOutlined />
                </button>
            </form>
        </>
    )
}

interface UploadForm extends HTMLFormElement {
    image: HTMLInputElement
}

const handleSubmit = async (e: FormEvent, updateList: () => void) => {
    e.preventDefault()

    const target = e.target as UploadForm
    if (!target.image.files || target.image.files.length < 1)
        throw new Error("No files selected")

    const image = target.image.files[0]
    const formData = new FormData()
    formData.append("image", image)

    const options = {
        method: "POST",
        headers: {
            Accept: "application/json",
        },
        body: formData,
    }

    const res = await fetch("/api/upload", options)
    const result: UploadAPI = await res.json()

    // Server returned an error
    if (!result.ok) throw new Error(result.msg)

    target.reset()

    // Update photo list
    updateList()
}

export default ListOfPhotos
