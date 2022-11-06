import { ReactNode } from "react"
import styles from "./link.module.css"

type StyledLinkProps = {
    children: ReactNode
    isActive?: boolean
    light?: boolean
}

const StyledLink = ({ children, isActive, light }: StyledLinkProps) => {
    const textStyle = light ? styles.Light : ""
    const linkStyle = isActive ? styles.ActiveLink : styles.Link
    const className = textStyle + " " + linkStyle + " " + styles.Content
    return (
        <div className={className}>
            {children}
            <div className={styles.Underline}></div>
        </div>
    )
}

export default StyledLink
