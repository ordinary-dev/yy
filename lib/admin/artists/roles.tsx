import useSWR, { useSWRConfig } from "swr"
import { FormEvent } from "react"
import { SaveOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { RolesAPI } from "pages/api/roles"
import styles from "./artists.module.css"

export default function Roles() {
    const { data, error } = useSWR<RolesAPI, Error>("/api/roles")
    const { mutate } = useSWRConfig()
    const reload = () => mutate("/api/roles")

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>
    if (!data.roles) return <div>Server error</div>

    return (
        <div>
            <h4>Roles</h4>
            {data.roles.map((role) => (
                <Role
                    key={role.id}
                    nameEn={role.nameEn}
                    nameRu={role.nameRu}
                    id={role.id}
                    onChange={reload}
                />
            ))}
            <NewRole onSuccess={reload} />
        </div>
    )
}

const Role = (props: {
    nameEn: string
    nameRu: string
    id: number
    onChange: () => void
}) => (
    <form
        className={styles.Container}
        onSubmit={e => updateRole(e, props.onChange)}
    >
        <input
            type="hidden"
            name="roleID"
            value={props.id}
            readOnly
        />
        <input
            defaultValue={props.nameEn}
            placeholder="Name in english"
            name="roleNameEn"
            required
        />
        <input
            defaultValue={props.nameRu}
            placeholder="Name in russian"
            name="roleNameRu"
            required
        />
        <button type="submit">
            <SaveOutlined />
        </button>
        <button type="button" onClick={() => deleteRole(props.id, props.onChange)}>
            <DeleteOutlined />
        </button>
    </form>
)

interface RoleForm extends HTMLFormElement {
    roleID: HTMLInputElement
    roleNameEn: HTMLInputElement
    roleNameRu: HTMLInputElement
}

async function updateRole(e: FormEvent, onChange: () => void) {
    e.preventDefault()

    const target = e.target as RoleForm
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: parseInt(target.roleID.value, 10),
            nameEn: target.roleNameEn.value,
            nameRu: target.roleNameRu.value,
        }),
    }
    const response = await fetch("/api/roles", options)
    if (!response.ok) {
        alert(`Request failed, code ${response.status}`)
        return
    }
    
    onChange()
}

async function deleteRole(id: number, onSuccess: () => void) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }

    const response = await fetch("/api/roles", options)
    if (!response.ok) {
        alert(`Request failed, code ${response.status}`)
        return
    }

    onSuccess()
}

const NewRole = ({ onSuccess }: { onSuccess: () => void }) => (
    <form
        onSubmit={(e) => submitNewRole(e, onSuccess)}
        className={styles.Container}
    >
        <input
            type="text"
            name="roleNameEn"
            placeholder="Name in english"
            required
        />
        <input
            type="text"
            name="roleNameRu"
            placeholder="Name in russian"
            required
        />
        <button type="submit">
            <PlusOutlined />
        </button>
    </form>
)

interface NewRoleForm extends HTMLFormElement {
    roleNameEn: HTMLInputElement
    roleNameRu: HTMLInputElement
}

async function submitNewRole(e: FormEvent, onSuccess: () => void) {
    e.preventDefault()

    const target = e.target as NewRoleForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nameEn: target.roleNameEn.value,
            nameRu: target.roleNameRu.value,
        }),
    }

    const response = await fetch("/api/roles", options)
    if (!response.ok) {
        alert(`Request failed, code ${response.status}`)
        return
    }
    
    target.reset()
    onSuccess()
}
