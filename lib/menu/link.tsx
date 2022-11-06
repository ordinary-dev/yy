import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import StyledLink from "lib/link"

const PageLink = ({
    href,
    children,
    forcedVisibility,
}: {
    href: string
    children: ReactNode
    forcedVisibility: boolean
}) => {
    const router = useRouter()
    const style = forcedVisibility ? { display: "block" } : {}
    return (
        <div style={style}>
            <Link href={href}>
                <StyledLink isActive={router.asPath === href}>
                    {children}
                </StyledLink>
            </Link>
        </div>
    )
}

export default PageLink
