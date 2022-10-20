import { ReactNode } from "react"

import { LeftMenu } from "./left"
import { MobileMenu } from "./mobile"
import styles from "./index.module.css"

const Layout = (props: { children: ReactNode }) => {
    return (
        <div className={styles.Container}>
            <LeftMenu />
            <div className={styles.PageContainer}>
                <MobileMenu />
                {props.children}
            </div>
        </div>
    )
}

export default Layout
