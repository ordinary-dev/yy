import styles from "./controls.module.css"

const Controls = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (arg0: boolean) => void
}) => {
    if (isOpen)
        return (
            <button className={styles.Button} onClick={() => setIsOpen(false)}>
                <Lines />
            </button>
        )
    return (
        <button className={styles.Button} onClick={() => setIsOpen(true)}>
            <Lines />
        </button>
    )
}

const Lines = () => (
    <div className={styles.Lines}>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default Controls
