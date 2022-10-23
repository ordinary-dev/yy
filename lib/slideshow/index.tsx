import Image from "next/image"
import { useState, useEffect, ReactNode } from "react"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

import styles from "./slideshow.module.css"

const Slideshow = (props: {
    urls: string[]
    descriptions: (string | null)[]
    onSlideChange?: (arg0: number) => void
}) => {
    // Current slide number
    const [index, setIndex] = useState(0)

    const onChange = () => {
        if (props.onSlideChange) props.onSlideChange(index)
    }

    // Functions for changing the slide
    const prev = () => {
        if (index > 0) setIndex(index - 1)
        else setIndex(slideList.length - 1)
        onChange()
    }
    const next = () => {
        if (index + 1 < slideList.length) setIndex(index + 1)
        else setIndex(0)
        onChange()
    }

    useEffect(() => {
        // Bind arrow keys
        const handleClick = (e: KeyboardEvent) => {
            if (e.defaultPrevented) {
                return // Do nothing if the event was already processed
            }
            if (e.repeat) {
                return
            }
            switch (e.key) {
                case "Left": // IE/Edge specific value
                case "ArrowLeft":
                    prev()
                    break
                case "Right":
                case "ArrowRight":
                    next()
                    break
                default:
                    return
            }
            e.preventDefault()
        }
        window.addEventListener("keydown", handleClick)
        return () => {
            window.removeEventListener("keydown", handleClick)
        }
    }, [prev, next])

    // List of all slides
    const slideList = props.urls.map((url, itemIndex) => (
        <Slide key={url} index={itemIndex} activeIndex={index}>
            <Image
                src={url}
                alt="Photo"
                layout="fill"
                objectFit="contain"
                unoptimized={true}
            />
        </Slide>
    ))

    // Load only 3 slides: current, previous and next
    const prevIndex = index > 0 ? index - 1 : slideList.length - 1
    const nextIndex = index + 1 < slideList.length ? index + 1 : 0
    const currentSlides = slideList.filter(
        (_item, itemIndex) =>
            itemIndex === index ||
            itemIndex === prevIndex ||
            itemIndex === nextIndex
    )

    return (
        <>
            <div className={styles.MainRow}>
                <Button onClick={prev}>
                    <LeftOutlined />
                </Button>

                <div className={styles.Placeholder}>
                    <div className={styles.FullscreenButton} onClick={prev}>
                        <LeftOutlined />
                    </div>
                    {currentSlides}
                    <div className={styles.FullscreenButton} onClick={next}>
                        <RightOutlined />
                    </div>
                </div>

                <Button onClick={next}>
                    <RightOutlined />
                </Button>
            </div>
            <Description text={props.descriptions[index]} />
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

// The component processes the string and replaces the '<b>' tag
// with a real <span> tag.
const Description = ({ text }: { text: string | null }) => {
    // Template
    const Body = ({ children }: { children?: ReactNode }) => (
        <div className={styles.Description}>{children}</div>
    )

    if (!text) return <Body></Body>

    // Check tags
    const firstTag = text.indexOf("<b>")
    const secondTag = text.indexOf("</b>")
    if (firstTag === -1 || secondTag === -1 || firstTag > secondTag)
        return <Body>{text}</Body>

    // Split string using regular expression
    const array = text.split(/<b>|<\/b>/)
    return (
        <Body>
            {array[0]}
            <span>{array[1]}</span>
            {array[2]}
        </Body>
    )
}

export default Slideshow
