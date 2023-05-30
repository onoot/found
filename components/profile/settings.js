// profile/settings.js

import { useState } from 'react'
import axios from 'axios'
import styles from '../../styles/Home.module.css'

const Settings = () => {
    const [formState, setFormState] = useState({
        name: '',
        phone: '',
        email: '',
        birthday: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await axios.post('api/settings', formState);
        console.log(response);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className={styles.gridP}>
            <h1>Настройки</h1>
            <div>
                <span className={styles.categoryTitle}>Контакты:</span>
                <div className={styles.cardsettings}>
                    <div className='ads'>
                        <label htmlFor="name">Ваше имя:</label>
                        <br />
                        <input type="text" id="name" name="name" value={formState.name} onChange={handleChange} />
                        <br />
                        <label htmlFor="phone">Номер телефона:</label>
                        <br />
                        <input type="tel" id="phone" name="phone" value={formState.phone} onChange={handleChange} />
                        <br />
                        <label htmlFor="email">Email:</label>
                        <br />
                        <input type="email" id="email" name="email" value={formState.email} onChange={handleChange} />
                        <br />
                        <label htmlFor="birthday">Дата рождения:</label>
                        <br />
                        <input type="date" id="birthday" name="birthday" value={formState.birthday} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <div>
                <span className={styles.categoryTitle}>Безопасность:</span>
                <div className={styles.cardsettings}>
                    <div className='ads'>
                        <label htmlFor="currentPassword">Текущий пароль:</label>
                        <br />
                        <input type="password" id="currentPassword" name="currentPassword" value={formState.currentPassword} onChange={handleChange} />
                        <br />
                        <label htmlFor="newPassword">Новый пароль:</label>
                        <br />
                        <input type="password" id="newPassword" name="newPassword" value={formState.newPassword} onChange={handleChange} />
                        <br />
                        <label htmlFor="confirmPassword">Подтвердите новый пароль:</label>
                        <br />
                        <input type="password" id="confirmPassword" name="confirmPassword" value={formState.confirmPassword} onChange={handleChange} />
                    </div>
                </div>
            </div>
            <button className={styles.savedata} type="submit" onClick={handleSubmit}>Сохранить данные</button>
        </div>
    )
}

export default Settings;
