import withLayout from '../hoc/withLayout'
import Myads from '../components/profile/myads'
import Settings from '../components/profile/settings'
import styles from '../styles/Home.module.css'
import {useState} from "react";
import {Router} from "next/router";

const Profile = ({ user }) => {
    const [componentToShow, setComponentToShow] = useState(<Settings />)

    const handleButtonClick = (component) => {
        setComponentToShow(component)
    }

    return (
        <div className={styles.container}>
            <div className={styles.profContainer}>
                <div className={styles.lefthelp}>
                    <h1>Профиль</h1>
                    <div className={styles.profileInfo}>
                        <img
                            src="/profill.webp"
                            alt="Фото профиля"
                            className={styles.profilePhoto}
                        />
                        <h2 className={styles.profileName}>{user?.email}</h2>
                    </div>
                    <div className={styles.profileNavigation}>
                        <div>
                            <button
                                onClick={() => handleButtonClick(<Myads />)}
                                className={styles.favorButton}
                            >
                                <img src="/myads.png" alt="ads" className={styles.favor} />
                                Мои Объявления
                            </button>
                        </div>
                        <div className={styles.favorGor}>
                            <button
                                onClick={() => handleButtonClick(<Settings />)}
                                className={styles.favorButton}
                            >
                                <img src="/set.png" alt="set" className={styles.favor} />
                                Настройки
                            </button>
                        </div>
                        <div className={styles.favorGor}>
                            <button
                                onClick={() => handleButtonClick(<Myads />)}
                                className={styles.favorButton}
                            >
                                <img src="/egg.png" alt="fav" className={styles.favor} />
                                Избранное
                            </button>
                        </div>
                        <div>
                            <button className={styles.profileLogOut}>Выйти</button>
                        </div>
                    </div>
                </div>
                <div>{componentToShow}</div>
            </div>
        </div>
    )
}

Profile.getInitialProps = async (ctx) => {
    const res = await fetch('/api/auth/profile', {
        credentials: 'include'
    })

    if (!res.ok) {
        if (ctx.req) {
            ctx.res.writeHead(302, { Location: '/login' })
            ctx.res.end()
        } else {
            await Router.push('/login')
        }
    }

    const data = await res.json()

    return { user: data }
}

export default withLayout(Profile)
