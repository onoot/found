import Link from "next/link";
import {useState} from "react";
import styles from '../styles/Home.module.css';
import ReportButton from "./report/reportc";


const Navigation = () => {
    const [showMenu, setShowMenu] = useState(false);
const user = 'test'

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <img src="/svg.svg" alt="logo" className={styles.svg} />
                <Link href={"/"}>
                    <h1>Найдёныш</h1>
                </Link>
            </div>
            <Link href="/contacts">Контакты</Link>
            <Link href="/bulletins">
                Объявления
                <div className={styles.adsN}>
                    <div className={styles.adss} data="1"></div>
                </div>
            </Link>
            <Link href="/help">Помощь</Link>
            <Link href="/about">О Нас</Link>
            <div className={styles.rightMenu}>
                <ReportButton />
                {user.email ? (
                    <ProfileButton user={user.email} />
                ) : (
                    <Link href="/login">Войти</Link>
                )}
            </div>
        </nav>
    );
};

const ProfileButton = ({ user }) => {
    return (
        <div className={styles.profileButton}>
            <Link href="/profile">34</Link>
            <img src="/profill.webp" alt="Profile photo" />
        </div>
    );
};

export default Navigation;
