import Link from "next/link"
import Image from "next/image"
import YY from "public/logo.png"
import styles from "./logo.module.css"

// YY
const Logo = () => {
    return (
        <Link href="/" passHref>
            <a className={styles.Logo}>
                <Image
                    src={YY}
                    alt="Logo"
                    layout="fill"
                    objectFit="contain"
                    placeholder="blur"
                />
            </a>
        </Link>
    )
}

export default Logo
