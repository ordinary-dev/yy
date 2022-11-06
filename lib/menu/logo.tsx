import Link from "next/link"
import Image from "next/image"
import YY from "public/logo.png"
import styles from "./logo.module.css"

// YY
const Logo = () => {
    return (
        <Link href="/" className={styles.Logo}>
            <Image src={YY} alt="Logo" placeholder="blur" fill />
        </Link>
    )
}

export default Logo
