import { ReactNode, forwardRef, ForwardedRef } from "react"
import styles from "./link.module.css"

type StyledLinkProps = {
    onClick?: () => void
    href?: string
    children: ReactNode
    isActive?: boolean
}


const StyledLinkComponent = ({ onClick, href, children, isActive }: StyledLinkProps, ref: ForwardedRef<HTMLAnchorElement>) => {
    return (
        <a href={href} onClick={onClick} ref={ref} className={isActive ? styles.ActiveLink : styles.Link}>
            {children}
            <div className={styles.Underline}></div>
        </a>
    )
}

const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(StyledLinkComponent)

export default StyledLink
