import styles from "./links.module.css"
import Logo from "./logo"
import Artists from "./artists"
import Info from "./info"
import Locale from "./locale"

export const Links = () => {
    return (
        <>
            <Logo />
            <div className={styles.MainLinks}>
                <Artists />
                <Info />
            </div>
            <Locale />
        </>
    )
}
