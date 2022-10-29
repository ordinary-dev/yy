import useSWR, { useSWRConfig } from "swr"
import { FormEvent, ChangeEvent, useState } from "react"
import { PeopleAPI } from "pages/api/people"

const People = () => {
    const { data, error } = useSWR<PeopleAPI, Error>("/api/people")
    const { mutate } = useSWRConfig()

    if (error) return <div>Error</div>
    if (!data) return <div>Loading</div>
    if (!data.people) return <div>Server error</div>

    const reload = () => {
        mutate("/api/people")
    }

    return (
        <div>
            <h4>People</h4>
            {data.people.map(person => (
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
                onSubmit={e =>
                    updatePerson(e, props.id, nameEn, nameRu, props.onChange)
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
            <button onClick={() => deletePerson(props.id, props.onChange)}>
                Delete
            </button>
        </div>
    )
}

const updatePerson = async (
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
    const response = await fetch("/api/people", options)
    if (response.status === 200) onChange()
}

const deletePerson = async (id: number, onSuccess: () => void) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    }
    const response = await fetch("/api/people", options)
    if (response.status === 200) onSuccess()
}

const NewPerson = ({ onSuccess }: { onSuccess: () => void }) => {
    return (
        <form onSubmit={e => submitNewPerson(e, onSuccess)}>
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
            <input type="submit" value="Add" />
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

export default People
