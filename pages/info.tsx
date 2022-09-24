import type { NextPage } from 'next'
import Link from 'next/link'

const Info: NextPage = props => {
    return <>
        <Link href="/login" passHref>
            <a>Edit content</a>
        </Link>
    </>
}

export default Info
