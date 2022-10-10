import { Links } from "./links"
import styles from "./left.module.css"

export const LeftMenu = () => {
    return (
        <>
            <div className={styles.Container}>
                <Links />
            </div>
            <div className={styles.FakeContainer}></div>
        </>
    )
}
