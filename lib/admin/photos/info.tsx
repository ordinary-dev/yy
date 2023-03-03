import { ReactNode } from "react"
import { PictureOutlined, ColumnHeightOutlined, ColumnWidthOutlined, FileOutlined } from "@ant-design/icons"
import styles from "./info.module.css"

const Info = (props: {
    ext: string
    width: number
    height: number
    size: number
}) => {
    return (
        <div className={styles.Info}>
            <Warning
                isVisible={props.ext !== "webp" && props.ext !== "avif"}
                tooltip="Recommended formats: webp, avif"
            >
                <PictureOutlined /> {props.ext}
            </Warning>

            <Warning
                isVisible={props.width > 3000}
                tooltip="Recommended width: <3000px"
            >
                <ColumnWidthOutlined /> {props.width} px
            </Warning>

            <Warning
                isVisible={props.height > 3000}
                tooltip="Recommended height: <3000px"
            >
                <ColumnHeightOutlined /> {props.height} px
            </Warning>

            <Warning
                isVisible={props.size > 512 * 1024}
                tooltip="Recommended file size: < 512 kb"
            >
                <FileOutlined /> {Math.floor(props.size / 1024)} kbytes
            </Warning>
        </div>
    )
}

const Warning = ({
    children,
    isVisible,
    tooltip
}: {
    children: ReactNode
    isVisible: boolean
    tooltip: string
}) => {
    if (isVisible)
        return (
            <div className={styles.Error}>
                {children}
                <span className={styles.Tooltip}>{tooltip}</span>
            </div>
        )
    return <div>{children}</div>
}

export default Info
