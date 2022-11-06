import Link from "next/link"
import { useRouter } from "next/router"
import { ReactNode } from "react"
import StyledLink from "lib/link"

const PageLink = ({
    href,
    children,
}: {
    href: string
    children: ReactNode
}) => {
    const router = useRouter()
    return (
        <Link href={href}>
            <StyledLink isActive={router.asPath === href}>
                {children}
            </StyledLink>
        </Link>
    )
}

export default PageLink
