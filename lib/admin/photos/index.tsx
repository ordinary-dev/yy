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

import { PhotoAPI } from "pages/api/photo"
import { DeleteAPI } from "pages/api/delete"
import { UpdateAPI } from "pages/api/update"
import { UploadAPI } from "pages/api/upload"
import styles from "./photos.module.css"

const ListOfPhotos = () => {
    const { data, error } = useSWR<PhotoAPI, Error>("/api/photo")
    const { mutate } = useSWRConfig()

    const updateList = () => {
        mutate("/api/photo")
    }

    if (error) return <ExclamationCircleOutlined />
    if (!data) return <LoadingOutlined spin={true} />

    return (
        <div className={styles.Container}>
            <div>List of photos:</div>
            {data.photos.map((photo, index) => (
                <Photo
                    key={index}
                    id={photo.id}
                    ext={photo.ext}
                    descEn={photo.descriptionEn}
                    descRu={photo.descriptionRu}
                    width={photo.width}
                    height={photo.height}
                    updateList={updateList}
                    size={photo.size}
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
    updateList: () => void
    size: number
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
        </div>
    )
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
