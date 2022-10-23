import { ReactNode } from "react"
import { ExclamationCircleOutlined } from "@ant-design/icons"
import styles from "./info.module.css"

const Info = (props: {
    ext: string
    width: number
    height: number
    size: number
}) => {
    return (
        <div className={styles.Info}>
            <h3>Info</h3>
            <Warning isVisible={props.ext !== "webp" && props.ext !== "avif"}>
                <div>Format: {props.ext}</div>
            </Warning>

            <Warning isVisible={props.width > 3000}>
                <div>Width: {props.width}</div>
            </Warning>

            <Warning isVisible={props.height > 3000}>
                <div>Height: {props.height}</div>
            </Warning>

            <Warning isVisible={props.size > 512 * 1024}>
                Size: {Math.floor(props.size / 1024)} kbytes
            </Warning>
        </div>
    )
}

const Warning = ({
    children,
    isVisible,
}: {
    children: ReactNode
    isVisible: boolean
}) => {
    if (isVisible)
        return (
            <div className={styles.Error}>
                {children}
                <ExclamationCircleOutlined />
            </div>
        )
    return <div>{children}</div>
}

export default Info
