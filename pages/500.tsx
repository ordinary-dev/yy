import Meta from "lib/meta"
import styles from "styles/error.module.css"

export default function ErrorPage() {
    return (
        <div className={styles.Page}>
            <Meta title="500" />
            Error #500
        </div>
    )
}
