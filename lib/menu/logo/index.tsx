import Link from "next/link"
import Image from "next/image"
import styles from "./logo.module.css"

// YY
const Logo = () => (
    <Link href="/" className={styles.Logo}>
        <Image src="/logo.svg" alt="Logo" fill />
    </Link>
)

export default Logo
