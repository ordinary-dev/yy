import Link from "next/link"
import { useRouter } from "next/router"
import StyledLink from "lib/link"
import styles from "./locale.module.css"

const Locale = ({ isVisible }: { isVisible: boolean }) => {
    const router = useRouter()

    // Mobile version only
    const style = isVisible
        ? {
              display: "flex",
          }
        : {}

    return (
        <div style={style} className={styles.Lang}>
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
