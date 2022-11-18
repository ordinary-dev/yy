import useSWR, { useSWRConfig } from "swr"
import { FormEvent, ChangeEvent, useState } from "react"
import { RolesAPI } from "pages/api/roles"

const Roles = () => {
    const { data, error } = useSWR<RolesAPI, Error>("/api/roles")
    const { mutate } = useSWRConfig()

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>
    if (!data.roles) return <div>Server error</div>

    const reload = () => {
        mutate("/api/roles")
    }

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
}) => {
    const [nameEn, setNameEn] = useState(props.nameEn)
    const [nameRu, setNameRu] = useState(props.nameRu)

    const changeEnName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameEn(e.target.value)
    }

    const changeRuName = (e: ChangeEvent<HTMLInputElement>) => {
        setNameRu(e.target.value)
    }

    return (
        <div>
            <form
                onSubmit={(e) =>
                    updateRole(e, props.id, nameEn, nameRu, props.onChange)
                }>
                <input
                    value={nameEn}
                    onChange={changeEnName}
                    placeholder="English name"
                    required
                />
                <input
                    value={nameRu}
                    onChange={changeRuName}
                    placeholder="Russian name"
                    required
                />
                <input type="submit" value="Save" />
            </form>
            <button onClick={() => deleteRole(props.id, props.onChange)}>
                Delete
            </button>
        </div>
    )
}

const updateRole = async (
    e: FormEvent,
    id: number,
    nameEn: string,
    nameRu: string,
    onChange: () => void
) => {
    e.preventDefault()
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, nameEn, nameRu }),
    }
    const response = await fetch("/api/roles", options)
    if (response.status === 200) onChange()
}

const deleteRole = async (id: number, onSuccess: () => void) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }
    const response = await fetch("/api/roles", options)
    if (response.status === 200) onSuccess()
}

const NewRole = ({ onSuccess }: { onSuccess: () => void }) => {
    return (
        <form onSubmit={(e) => submitNewRole(e, onSuccess)}>
            <input
                required
                type="text"
                name="roleNameEn"
                placeholder="Name in english"
            />
            <input
                required
                type="text"
                name="roleNameRu"
                placeholder="Name in russian"
            />
            <input type="submit" value="Add" />
        </form>
    )
}

interface RoleForm extends HTMLFormElement {
    roleNameEn: HTMLInputElement
    roleNameRu: HTMLInputElement
}

const submitNewRole = async (e: FormEvent, onSuccess: () => void) => {
    e.preventDefault()
    const target = e.target as RoleForm
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
    if (response.status === 200) {
        onSuccess()
        target.reset()
    }
}

export default Roles
