import styles from "./separator.module.css"

// The line in the menu between before the locale switcher.
// On large screens, it has a transparent fill.
// The element is hidden by default.
const Separator = ({ isVisible }: { isVisible: boolean }) => (
    <div
        style={isVisible ? { display: "block" } : {}}
        className={styles.Separator}></div>
)

export default Separator
