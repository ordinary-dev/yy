import Image from "next/image"
import { useRouter } from "next/router"
import { useState, useEffect, ReactNode, useCallback } from "react"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"
import sanitizeHtml from 'sanitize-html'
import styles from "./slideshow.module.css"

export interface SlideProps {
    url: string
    description: string | null
}

const Slideshow = ({
    slides,
    onSlideChange,
}: {
    slides: SlideProps[]
    onSlideChange?: (arg0: number) => void
}) => {
    const router = useRouter()
    
    // Current slide number
    const [index, setIndex] = useState(0)

    const onChange = useCallback(() => {
        if (onSlideChange) onSlideChange(index)
    }, [onSlideChange, index])

    // List of all slides
    const slideList = slides.map((slide, slideIndex) => (
        <Slide key={slide.url} isVisible={slideIndex === index}>
            <Image
                src={slide.url}
                alt={slide.description || (router.locale === "ru" ? "Фото от YY Studios" : "Photo by YY Studios")}
                unoptimized
                fill
            />
        </Slide>
    ))

    // Functions for changing the slide
    const prev = useCallback(() => {
        if (index > 0) setIndex(index - 1)
        else setIndex(slideList.length - 1)
        onChange()
    }, [index, onChange, slideList.length])
    const next = useCallback(() => {
        if (index + 1 < slideList.length) setIndex(index + 1)
        else setIndex(0)
        onChange()
    }, [index, onChange, slideList.length])

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

    // Load only 3 slides: current, previous and next
    const prevIndex = index > 0 ? index - 1 : slideList.length - 1
    const nextIndex = index + 1 < slideList.length ? index + 1 : 0
    const currentSlides = slideList.filter((_, slideIndex) => (
        slideIndex === index ||
        slideIndex === prevIndex ||
        slideIndex === nextIndex
    ))

    return (
        <>
            <div className={styles.MainRow}>
                <Button onClick={prev}>
                    <LeftOutlined />
                </Button>

                <div className={styles.Placeholder}>{currentSlides}</div>

                <Button onClick={next}>
                    <RightOutlined />
                </Button>
            </div>
            <Description text={slides[index]?.description} />
        </>
    )
}

const Slide = ({children, isVisible}: {
    children: ReactNode
    isVisible: boolean
}) => {
    const style = {
        opacity: isVisible ? 1 : 0,
    }
    return (
        <div style={style} className={styles.Slide}>
            {children}
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

// The component processes the string
// and returns description with safe html tags.
const Description = ({ text }: { text: string | null }) => {
    if (!text) return <div className={styles.Description} />

    return (
        <div
            className={styles.Description}
            dangerouslySetInnerHTML={{
                __html: sanitizeHtml(
                    text,
                    {
                        allowedTags: ['b', 'i', 'u', 'em', 'strong'],
                    })
            }}
        />
    )
}

export default Slideshow
