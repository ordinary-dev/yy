import useSWR, { useSWRConfig } from "swr"
import { FormEvent } from "react"
import { PeopleAPIGoodResponse } from "pages/api/people"
import { RolesAPIGoodResponse } from "pages/api/roles"
// import styles from "./artists.module.css"

const Artists = () => {
    const people = useSWR<PeopleAPIGoodResponse, Error>("/api/people")
    const roles = useSWR<RolesAPIGoodResponse, Error>("/api/roles")
    const { mutate } = useSWRConfig()

    if (people.error || roles.error) return <div>Error</div>
    if (!people.data || !roles.data) return <div>Loading</div>

    const refresh = () => {
        mutate("/api/people")
        mutate("/api/roles")
    }

    return (
        <div>
            <h4>Artists</h4>
            {people.data.people.map(person => (
                <div key={person.id}>
                    Person: {person.nameEn} - {person.nameRu} ({person.url})
                </div>
            ))}
            <NewPerson onSuccess={refresh} />
            {roles.data.roles.map(role => (
                <div key={role.id}>
                    Role: {role.nameEn} - {role.nameRu} ({role.url})
                </div>
            ))}
            <NewRole onSuccess={refresh} />
        </div>
    )
}

const NewPerson = ({ onSuccess }: { onSuccess: () => void }) => {
    return (
        <form onSubmit={e => submitNewPerson(e, onSuccess)}>
            <div>Add person</div>
            <input
                required
                type="text"
                name="personNameEn"
                placeholder="Name in english"
            />
            <input
                required
                type="text"
                name="personNameRu"
                placeholder="Name in russian"
            />
            <input type="submit" value="Save" />
        </form>
    )
}

interface PersonForm extends HTMLFormElement {
    personNameEn: HTMLInputElement
    personNameRu: HTMLInputElement
}

const submitNewPerson = async (e: FormEvent, onSuccess: () => void) => {
    e.preventDefault()
    const target = e.target as PersonForm
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nameEn: target.personNameEn.value,
            nameRu: target.personNameRu.value,
        }),
    }
    const response = await fetch("/api/people", options)
    if (response.status === 200) {
        onSuccess()
        target.reset()
    }
}

const NewRole = ({ onSuccess }: { onSuccess: () => void }) => {
    return (
        <form onSubmit={e => submitNewRole(e, onSuccess)}>
            <div>Add role</div>
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
            <input type="submit" value="Save" />
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

export default Artists
