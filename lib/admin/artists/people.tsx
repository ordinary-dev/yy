import useSWR, { useSWRConfig } from "swr"
import { FormEvent } from "react"
import { SaveOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons"
import { PeopleAPI } from "pages/api/people"
import styles from "./artists.module.css"

export default function People() {
    const { data, error } = useSWR<PeopleAPI, Error>("/api/people")
    const { mutate } = useSWRConfig()
    const reload = () => mutate("/api/people")

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>
    if (!data.people) return <div>Server error</div>

    return (
        <div>
            <h4>People</h4>
            {data.people.map((person) => (
                <Person
                    key={person.id}
                    nameEn={person.nameEn}
                    nameRu={person.nameRu}
                    id={person.id}
                    onChange={reload}
                />
            ))}
            <NewPerson onSuccess={reload} />
        </div>
    )
}

const Person = (props: {
    nameEn: string
    nameRu: string
    id: number
    onChange: () => void
}) => (
    <form
        className={styles.Container}
        onSubmit={e => updatePerson(e, props.onChange)}
    >
        <input
            type="hidden"
            name="personID"
            value={props.id}
            readOnly
        />
        <input
            name="personNameEn"
            defaultValue={props.nameEn}
            placeholder="Name in english"
            required
        />
        <input
            name="personNameRu"
            defaultValue={props.nameRu}
            placeholder="Name in russian"
            required
        />
        <button type="submit">
            <SaveOutlined />
        </button>
        <button type="button" onClick={() => deletePerson(props.id, props.onChange)}>
            <DeleteOutlined />
        </button>
    </form>
)

interface PersonForm extends HTMLFormElement {
    personID: HTMLInputElement
    personNameEn: HTMLInputElement
    personNameRu: HTMLInputElement
}

async function updatePerson(
    e: FormEvent,
    onChange: () => void
) {
    e.preventDefault()

    const target = e.target as PersonForm
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: parseInt(target.personID.value, 10),
            nameEn: target.personNameEn.value,
            nameRu: target.personNameRu.value,
        }),
    }
    const response = await fetch("/api/people", options)
    if (!response.ok) {
        alert(`Request failed, code ${response.status}`)
        return
    }

    onChange()
}

async function deletePerson(id: number, onSuccess: () => void) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }

    const response = await fetch("/api/people", options)
    if (!response.ok) {
        alert(`Request failed, code ${response.status}`)
        return
    }
    
    onSuccess()
}

const NewPerson = ({ onSuccess }: { onSuccess: () => void }) => (
    <form
        className={styles.Container}
        onSubmit={e => submitNewPerson(e, onSuccess)}
    >
        <input
            type="text"
            name="personNameEn"
            placeholder="Name in english"
            required
        />
        <input
            type="text"
            name="personNameRu"
            placeholder="Name in russian"
            required
        />
        <button type="submit">
            <PlusOutlined />
        </button>
    </form>
)

interface NewPersonForm extends HTMLFormElement {
    personNameEn: HTMLInputElement
    personNameRu: HTMLInputElement
}

async function submitNewPerson(e: FormEvent, onSuccess: () => void) {
    e.preventDefault()
    const target = e.target as NewPersonForm
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
    if (!response.ok) {
        alert(`Request failed, code ${response.status}`)
        return
    }

    target.reset()
    onSuccess()
}
