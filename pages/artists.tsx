import type { NextPage } from "next"
import Image from "next/image"
import Head from "next/head"

import WorkInProgress from "public/work-in-progress.png"

const Artists: NextPage = () => {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
                padding: "60px",
            }}>
            <Head>
                <title>Artists | YY studios</title>
            </Head>
            <Image
                src={WorkInProgress}
                width="500"
                height="460"
                alt="Work in progress"
            />
        </div>
    )
}

export default Artists
