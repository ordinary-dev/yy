import type { NextPage } from 'next'
import Link from 'next/link'
import styles from '../styles/info.module.css'

const Info: NextPage = props => {
    return <>
        <div className={ styles.Info }>
            <div className={ styles.MainColumn }>
                <div className={ styles.Title }>ABOUT</div>
                <div className={ styles.Text }>
                    YY STUDIOS IS A LOCAL ARTIST MANAGEMENT & PRODUCTION AGENCY REPRESENTING TALENT
                    IN THE FIELDS OF FASHION AND BEAUTY. FOUNDED IN SAINT-PETERSBURG IN 2022, YY STUDIOS
                    HAS CULTIVATED A COMMUNITY OF ARTISTS AND AGENT WHO FOCUS ON THE DISCIPLINES OF IMAGE MAKING,
                    STYLING, HAIR, MAKEUP, CASTING AND CREATIVE DIRECTION.   BEYOND DAY-TO-DAY MANAGEMENT
                    AND REPRESENTATION, YY STUDIOS WORKS WITH THEIR ARTISTS AND CLIENTS ON PROJECTS
                    OF ALL TYPES INCLUDING BRAND AND PRODUCT DEVELOPMENT, IMAGE LICENSING, EXHIBITIONS
                    AND BOOK PUBLISHING.
                </div>
            </div>
            <div className={ styles.Column }>
                <div className={ styles.Title }>SOCIAL MEDIA</div>
                <div className={ styles.Text }>INSTAGRAM</div>
                <div className={ styles.Text }>TELEGRAM</div>
            </div>
            <div className={ styles.Column }>
                <div className={ styles.Title }>GLOBAL ENQUIRES</div>
                <div className={ styles.Text }>INFO@YY-STUDIOS.ART</div>
                <div className={ styles.Text }>+7(982) 450-09-26</div>
                <div className={ styles.Text }>SERGEY</div>

                <div className={ styles.Title }>BOOKING IN MOSCOW</div>
                <div className={ styles.Text }>MSC@YY-STUDIOS.ART</div>

                <div className={ styles.Title }>BOOKING IN SAINT-PETERSBURG</div>
                <div className={ styles.Text }>SP@YY-STUDIOS.ART</div>

                <div className={ styles.Title }>FOR PARTICIPANTS</div>
                <div className={ styles.Text }>CASTING@YY-STUDIOS.ART</div>
            </div>
        </div>
        
        <div className={ styles.Footer }>
            <div className={ styles.Link }>PRIVACY POLICY</div>
            <div className={ styles.Link }>/</div>
            <div className={ styles.Link }>TERMS AND CONDITIONS</div>
            <div className={ styles.Link }>/</div>
            <Link href="/login" passHref>
                <a><div className={styles.Link}>CONTROL PANEL</div></a>
            </Link>
        </div>
    </>
}

export default Info
