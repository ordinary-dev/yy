import Image from "next/image"
import { useState, ReactNode } from "react"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

import styles from "./slideshow.module.css"

const Slideshow = (props: {
    urls: string[]
    descriptions: (string | null)[]
}) => {
    // Current slide number
    const [index, setIndex] = useState(0)

    // Functions for changing the slide
    const prev = () => {
        if (index > 0) setIndex(index - 1)
        else setIndex(slideList.length - 1)
    }
    const next = () => {
        if (index + 1 < slideList.length) setIndex(index + 1)
        else setIndex(0)
    }

    const slideList = props.urls.map((url, itemIndex) => (
        <Slide key={url} index={itemIndex} activeIndex={index}>
            <Image src={url} alt="Photo" layout="fill" objectFit="contain" />
        </Slide>
    ))

    return (
        <>
            <div className={styles.MainRow}>
                <Button onClick={prev}>
                    <LeftOutlined />
                </Button>

                <div className={styles.Placeholder}>{slideList}</div>

                <Button onClick={next}>
                    <RightOutlined />
                </Button>
            </div>
            <div className={styles.Description}>
                {props.descriptions[index]}
            </div>
        </>
    )
}

const Slide = (props: {
    children: ReactNode
    index: number
    activeIndex: number
}) => {
    const style = {
        opacity: props.activeIndex === props.index ? 1 : 0,
    }
    return (
        <div style={style} className={styles.Slide}>
            {props.children}
        </div>
    )
}

const Button = (props: { onClick: () => void; children: ReactNode }) => {
    return (
        <button className={styles.Button} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Slideshow
