import Link from "next/link"
import { useRouter } from "next/router"
import StyledLink from "lib/link"
import styles from "./locale.module.css"

// Menu buttons for switching locales.
// In the mobile version, all menu items are hidden by default.
// To show them when the menu opens, you need to override the style.
const LocaleSwitcher = ({ forceVisibility }: { forceVisibility: boolean }) => {
    const router = useRouter()

    return (
        <div
            style={forceVisibility ? { display: "flex" } : {}}
            className={styles.Lang}>
            <Link href={router.asPath} locale="ru">
                <StyledLink>RU</StyledLink>
            </Link>
            <div>/</div>
            <Link href={router.asPath} locale="en">
                <StyledLink>EN</StyledLink>
            </Link>
        </div>
    )
}

export default LocaleSwitcher
