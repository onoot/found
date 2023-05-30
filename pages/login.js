import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from '../styles/Home.module.css';
import withLayout from "../hoc/withLayout";
import {router} from "next/client";

function LoginPage() {
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [token, setToken] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRepeatPasswordChange = (event) => {
        setRepeatPassword(event.target.value);
    };

    const handleSwitchMode = () => {
        setIsRegister(prevMode => !prevMode);
    };

    const handleRegister = async (event) => {
        event.preventDefault();

        if (password !== repeatPassword) {
            toast.error("Пароли не совпадают");
            return;
        }

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: email,
                email,
                password
            })
        });

        if (response.ok) {
            const data = await response.json();
            setToken(data.token);
            toast.success("Вы успешно зарегистрировались!");
            await router.push('/profile')

        } else {
            const data = await response.json();
            toast.error(data.message);
        }
    };

    const handleLogin = async (event) => {
        event.preventDefault();

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if (response.ok) {
            const data = await response.json();
            setToken(data.token);
            toast.success("Вы успешно вошли!");
            await router.push('/profile')

        } else {
            const data = await response.json();
            toast.error(data.message);
        }
    }

    return (
        <div className={styles.loginPage}>
            <div className={styles.logoContainer}>
                <img className={styles.auth} src="/svg.svg" alt="Logo" />
                <h1 className={styles.title}>Всероссийская система поиска пропавших животных
                </h1>
            </div>

            <div className={styles.cardsettings}>
                <h2 className="h2">{isRegister ? "Зарегистрироваться" : "Войти"}</h2>
                <form>
                    {isRegister ? (
                        <>
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                            <label htmlFor="repeatPassword">Повторите пароль:</label>
                            <input type="password" id="repeatPassword" value={repeatPassword} onChange={handleRepeatPasswordChange} />
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={handleEmailChange} />
                            <input type="email" id="email" value={email} onChange={handleEmailChange} />
                        </>
                    ) : (
                        <>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" value={email} onChange={handleEmailChange} />
                            <label htmlFor="password">Пароль:</label>
                            <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                        </>
                    )}
                    <div className={styles.lo}>
                        <button className={styles.savedata} onClick={isRegister ? handleRegister : handleLogin}>
                            {isRegister ? "Зарегистрироваться" : "Войти"}
                        </button>
                        <button className={styles.loB} onClick={handleSwitchMode}>
                            {isRegister ? "У меня уже есть аккаунт" : "Зарегистрироваться"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withLayout(LoginPage);
