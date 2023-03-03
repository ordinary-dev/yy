import { FormEvent } from "react"
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
import { RoleGetResponse } from "pages/api/roles"
import { PersonGetResponse } from "pages/api/people"
import getImagePath from "lib/imagepath"
import Info from "./info"
import Artists from "./artists"
import Order from "./order"
import Visibility from "./visibility"
import styles from "./photos.module.css"

function usePhotos(): [PhotoAPI | undefined, Error | undefined] {
    const { data, error } = useSWR<PhotoAPI, Error>("/api/photo")
    return [data, error]
}

function useRoles(): [RoleGetResponse | undefined, Error | undefined] {
    const { data, error } = useSWR<RoleGetResponse, Error>("/api/roles")
    return [data, error]
}

function usePeople(): [PersonGetResponse | undefined, Error | undefined] {
    const { data, error } = useSWR<PersonGetResponse, Error>("/api/people")
    return [data, error]
}

export default function ListOfPhotos() {
    const [photos, photosErr] = usePhotos()
    const [roles, rolesErr] = useRoles()
    const [people, peopleErr] = usePeople()
    const { mutate } = useSWRConfig()

    const updateList = () => {
        mutate("/api/photo")
        mutate("/api/roles")
        mutate("/api/people")
    }

    if (photosErr || rolesErr || peopleErr)
        return <ExclamationCircleOutlined />
    if (!photos || !roles || !people)
        return <LoadingOutlined spin={true} />
    if (!Array.isArray(roles) || !Array.isArray(people))
        return <ExclamationCircleOutlined />

    return (
        <div className={styles.Container}>
            {photos.photos.map(photo => (
                <Photo
                    key={photo.id}
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
                    roles={roles}
                    people={people}
                    visibleOnHomepage={photo.visibleOnHomepage}
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
    visibleOnHomepage: boolean
}) => (
    <div>
        <div className={styles.Photo}>
            <div className={styles.PhotoContainer}>
                <Image
                    src={getImagePath(props.id, props.ext)}
                    alt="Uploaded photo"
                    fill
                    unoptimized
                />
                    
                <Visibility
                    id={props.id}
                    visibleOnHomepage={props.visibleOnHomepage}
                    updateList={props.updateList}
                />
                    
                <Order
                    id={props.id}
                    order={props.order}
                    onChange={props.updateList}
                />
            </div>
            
            <form className={styles.Stack} onSubmit={e => updatePhoto(e, props.id)}>
                <div className={styles.InputWithLabel}>
                    <label htmlFor={`english-description-${props.id}`}>En</label>
                    <input
                        id={`english-description-${props.id}`}
                        placeholder="English description"
                        value={props.descEn ?? undefined}
                        type="text"
                        name="descEn"
                    />
                </div>
                <div className={styles.InputWithLabel}>
                    <label htmlFor={`russian-description-${props.id}`}>Ru</label>
                    <input
                        id={`russian-description-${props.id}`}
                        placeholder="Russian description"
                        defaultValue={props.descRu ?? undefined}
                        type="text"
                        name="descRu"
                    />
                </div>
                <button type="submit">
                    <SaveOutlined /> Save
                </button>
                <button type="button" onClick={() => deletePhoto(props.id, props.updateList)}>
                    <DeleteOutlined /> Delete
                </button>
            </form>
        </div>

        <Artists
            id={props.id}
            artists={props.artists}
            roles={props.roles}
            people={props.people}
            onChange={props.updateList}
        />

        <Info
            ext={props.ext}
            width={props.width}
            height={props.height}
            size={props.size}
        />
    </div>
)

interface PhotoDescriptionForm extends HTMLFormElement {
    descEn: HTMLInputElement
    descRu: HTMLInputElement
}

async function updatePhoto(e: FormEvent, id: number) {
    e.preventDefault()

    const target = e.target as PhotoDescriptionForm
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id,
            descEn: target.descEn.value,
            descRu: target.descRu.value,
        }),
    }
    const response = await fetch("/api/update", options)
    if (!response.ok) {
        alert("Update failed")
    }
}

async function deletePhoto(id: number, updateList: () => void) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }
    const response = await fetch("/api/delete", options)
    if (!response.ok) {
        alert("Can't delete photo")
        return
    }

    updateList()
}

const UploadForm = (props: { updateList: () => void }) => (
    <form onSubmit={e => handleSubmit(e, props.updateList)}>
        <div>Upload new photo</div>
        <input
            type="file"
            accept="image/png, image/jpeg, image/webp, image/avif"
            name="image"
            required
        />
        <button type="submit" className={styles.Button}>
            <CloudUploadOutlined />
        </button>
    </form>
)

interface UploadForm extends HTMLFormElement {
    image: HTMLInputElement
}

async function handleSubmit(e: FormEvent, updateList: () => void) {
    e.preventDefault()

    const target = e.target as UploadForm
    if (!target.image.files || target.image.files.length < 1) {
        alert("Image list is empty")
        return
    }

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

    const response = await fetch("/api/upload", options)
    if (!response.ok) {
        alert(`Request failed, code ${response.status}`)
        return
    }

    target.reset()
    updateList()
}
