import Link from "next/link"
import { useRouter } from "next/router"
import StyledLink from "lib/link"
import { En, Ru } from "lib/interpreter"

const Info = () => {
    const router = useRouter()
    return (
        <Link href="/info" passHref>
            <StyledLink isActive={router.asPath === "/info"}>
                <En>INFO</En>
                <Ru>ИНФО</Ru>
            </StyledLink>
        </Link>
    )
}

export default Info
