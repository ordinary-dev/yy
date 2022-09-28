import type { NextPage } from 'next'
import Image from 'next/image'
import Head from 'next/head'

const Artists: NextPage = props => {
    return <>
        <Head><title>Artists | YY studios</title></Head>
        <Image src="/work-in-progress.png" width="500" height="460" alt="Work in progress" />
    </>
}

export default Artists
