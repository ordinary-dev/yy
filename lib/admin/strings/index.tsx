import useSWR, { useSWRConfig } from 'swr'
import { Text } from '@prisma/client'
import { FormEvent, useState } from 'react'
import { DeleteOutlined,
         SaveOutlined,
         ExclamationCircleOutlined,
         LoadingOutlined } from '@ant-design/icons'

import styles from './strings.module.css'

const ListOfStrings = () => {
    const { data, error } = useSWR<{ strings: Text[] }, Error>('/api/strings')
    const { mutate } = useSWRConfig()

    if (error) return <ExclamationCircleOutlined />
    if (!data) return <LoadingOutlined spin={ true } />

    const updateList = () => {
        mutate('/api/strings')
    }

    const list = data.strings.map(string =>
        <Record key={ string.id }
                data={ string }
                updateList={ updateList } />)

    return <div>
        <div>Your strings</div>
        { list }
        { list.length == 0 && <div>You don&apos;t have any strings</div> }
        <NewRecord updateList={ updateList } />
    </div>
}

// String saved in the database
const Record = ({ data, updateList }: {
    data: Text,
    updateList: () => void
}) => {
    const [value, setValue] = useState(data.value)

    return <div className={ styles.Record }>
        <form onSubmit={ e => updateString(e, data.id, value) }>
            <label>{ data.id }:</label>
            <textarea placeholder="value"
                      name="value"
                      value={ value }
                      onChange={ e => setValue(e.target.value) } />
            <button type="submit">
                <SaveOutlined /> Save
            </button>
        </form>
        <button onClick={ () => deleteString(data.id, updateList) }>
            <DeleteOutlined /> Delete
        </button>
    </div>
}

const updateString = async(e: FormEvent, id: string, value: string) => {
    e.preventDefault()

    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, value: value })
    }

    await fetch('/api/strings', options)
}

const deleteString = async(id: string, updateList: () => void) => {
    const options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
    }

    await fetch('/api/strings', options)
    updateList()
}

const NewRecord = ({ updateList }: { updateList: () => void }) => (
    <form onSubmit={ (e) => saveNewString(e, updateList) }
          className={ styles.Record }>
        <input placeholder="Id" name="stringId" />
        <textarea placeholder="Value"
                  name="value" />
        <button type="submit">Add new string</button>
    </form>
)

interface NewStringForm extends HTMLFormElement {
    stringId: HTMLInputElement
    value: HTMLInputElement
}

const saveNewString = async(e: FormEvent, updateList: () => void) => {
    e.preventDefault()

    const target = e.target as NewStringForm
    const id = target.stringId.value
    const value = target.value.value

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id, value: value })
    }

    await fetch('/api/strings', options)
    target.reset()
    updateList()
}

export default ListOfStrings
