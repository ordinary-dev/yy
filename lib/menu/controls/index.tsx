import styles from "./controls.module.css"

// Button to control the visibility of the menu in the mobile version
// -----
// -----
// -----
const Controls = ({
    isOpen,
    setIsOpen,
}: {
    isOpen: boolean
    setIsOpen: (arg0: boolean) => void
}) => (
    <button className={styles.Button} onClick={() => setIsOpen(!isOpen)}>
        <div></div>
        <div></div>
        <div></div>
    </button>
)

export default Controls
