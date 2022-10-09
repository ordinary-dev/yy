import Image from "next/image"
import Link from "next/link"

import { Links } from "./links"
import styles from "./left.module.css"
import Logo from "public/logo.png"

export const LeftMenu = () => {
    return (
        <>
            <div className={styles.Container}>
                <Link href="/" passHref>
                    <a>
                        <div className={styles.Logo}>
                            <Image
                                src={Logo}
                                alt="Logo"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                    </a>
                </Link>
                <Links />
            </div>
            <div className={styles.FakeContainer}></div>
        </>
    )
}
