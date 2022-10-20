import { ReactNode, forwardRef, ForwardedRef } from "react"
import styles from "./link.module.css"

type StyledLinkProps = {
    onClick?: () => void
    href?: string
    children: ReactNode
    isActive?: boolean
    light?: boolean
    rel?: string
    target?: string
}

const StyledLinkComponent = (
    { onClick, href, children, isActive, light, rel, target }: StyledLinkProps,
    ref: ForwardedRef<HTMLAnchorElement>
) => {
    const textStyle = light ? styles.Light : ""
    const linkStyle = isActive ? styles.ActiveLink : styles.Link
    const className = textStyle + " " + linkStyle
    return (
        <a
            href={href}
            onClick={onClick}
            ref={ref}
            className={className}
            rel={rel}
            target={target}>
            <div className={styles.Content}>
                {children}
                <div className={styles.Underline}></div>
            </div>
        </a>
    )
}

const StyledLink = forwardRef<HTMLAnchorElement, StyledLinkProps>(
    StyledLinkComponent
)

export default StyledLink
