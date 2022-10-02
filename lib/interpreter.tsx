import { useRouter } from 'next/router'
import { ReactNode } from 'react'

type InterpreterProps = {
    children: ReactNode
}

// Shows content only if the site language is Russian
export const Ru = (props: InterpreterProps) => {
    return <Interpreter locale="ru">
        { props.children }
    </Interpreter>
}

// Shows content only if the site language is English
export const En = (props: InterpreterProps) => {
    return <Interpreter locale="en">
        { props.children }
    </Interpreter>
}

const Interpreter = (props: InterpreterProps & { locale: string }) => {
    const router = useRouter()
    if (props.locale === router.locale) return <>{ props.children }</>
    return <></>
}
