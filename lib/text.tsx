import useSWR from 'swr'
import { Text } from '@prisma/client'

// Get a string from database by id.
// Returns default value if string doesn't exist.
// Example:
// --
// id       value
// descEn   Description in english
// descRu   Описание на русском
// --
// <RemoteString id="descEn" default="Description" />
const RemoteString = (props: { id: string, default: string }) => {
    const { data, error } = useSWR<{ record: Text }, Error>(`/api/strings/${props.id}`)

    if (error) return <>{ props.default }</>
    if (!data) return <></>
    if (!data.record) return <>{ props.default }</>

    return <>{ data.record.value }</>
}

export default RemoteString
