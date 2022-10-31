import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons"
import styles from "./visibility.module.css"

const Visibility = ({
    id,
    visibleOnHomepage,
    updateList,
}: {
    id: number
    visibleOnHomepage: boolean
    updateList: () => void
}) => {
    return (
        <div className={styles.Container}>
            Visibility on homepage:
            <button
                onClick={() =>
                    setVisibility(id, !visibleOnHomepage, updateList)
                }>
                {visibleOnHomepage && <EyeOutlined />}
                {!visibleOnHomepage && <EyeInvisibleOutlined />}
            </button>
        </div>
    )
}

const setVisibility = async (
    id: number,
    visibility: boolean,
    onSuccess: () => void
) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, visibility: visibility }),
    }
    const response = await fetch("/api/visibility", options)
    if (response.status === 200) onSuccess()
}

export default Visibility
