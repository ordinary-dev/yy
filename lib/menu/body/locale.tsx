import Link from "next/link"
import { useRouter } from "next/router"
import StyledLink from "lib/link"
import styles from "./locale.module.css"

const Locale = () => {
    const router = useRouter()

    return (
        <div className={styles.Lang}>
            <Link href={router.asPath} locale="ru" passHref>
                <StyledLink>RU</StyledLink>
            </Link>
            /
            <Link href={router.asPath} locale="en" passHref>
                <StyledLink>EN</StyledLink>
            </Link>
        </div>
    )
}

export default Locale
