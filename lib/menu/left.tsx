import { Links } from "./body"
import styles from "./left.module.css"

export const LeftMenu = () => {
    return (
        <div>
            <div className={styles.Container}>
                <Links />
            </div>
            <div className={styles.FakeContainer}></div>
        </div>
    )
}
