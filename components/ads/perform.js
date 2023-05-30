import React, {useEffect, useState} from "react";
import styles from "../../styles/Home.module.css";
import axios from "axios";


const PetForm = ({ formData, handleFormFieldChange, handleFormSubmit, options = {}, imageUrl }) => {

        const [ads, setAds] = useState([]);

        // Определяем состояние для выбранного пола
        const [selectedGender, setSelectedGender] = useState("");

        // Обработчик клика по кнопке мужского пола
        const handleMaleClick = () => {
            setSelectedGender("male");
        };

        // Обработчик клика по кнопке женского пола
        const handleFemaleClick = () => {
            setSelectedGender("female");
        };



    useEffect(() => {
        const fetchAds = async () => {
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
            setAds(data);
        };
        fetchAds();
    }, []);



    return (
        <form className={styles.form1} onSubmit={handleFormSubmit}>

            <div className={styles.grid_horizontal}>
                <div className={styles.scroll_container}>
                    {ads.map((ad) => (
                        <div className={styles.cardX} key={ad.id}>
                            {/* замените значения src на настоящие изображения */}
                            {ad.photo ? (
                                <img src={ad.photo} alt={ad.name} className={styles.photo} />
                            ) : (
                                <img
                                    src="https://kartinkin.net/uploads/posts/2021-01/thumbs/1611412760_6-p-chernii-fon-so-znakom-voprosa-6.jpg"
                                    alt="Нет фото"
                                    className={styles.photo}
                                />
                            )}
                            <div className="ads">
                                <p>{ad.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.row}>
                <div className={styles.col2}>
                    <div className={styles.field}>
                        <span className={styles.label}>Род:</span>
                        <select className={styles.select} name="param1" value={formData.param1} onChange={handleFormFieldChange}>
                            {options.param1?.length > 0 ?
                                options.param1.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                )) :
                                (<option value="">Не выбрано</option>)
                            }
                        </select>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>Порода:</span>
                        <select className={styles.select} name="param2" value={formData.param2} onChange={handleFormFieldChange}>
                            {options.param2?.length > 0 ?
                                options.param2.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                )) :
                                (<option value="">Не выбрано</option>)
                            }
                        </select>
                    </div>
                    </div>
                <div className={styles.col2}>
                    <div className={styles.field}>
                        <span className={styles.label}>Пол:</span>
                        <div className={styles.genderButtons}>
                            <button
                                className={styles.maleB}
                                onClick={handleMaleClick}
                                type="button"
                            >
                                <p
                                    className={styles.maleB}
                                />
                            </button>
                            <button
                                className={styles.fmaleB}
                                onClick={handleFemaleClick}
                                type="button"
                            >
                                <p
                                    className={styles.maleB}

                                />
                            </button>
                        </div>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>Окрас:</span>
                        <select className={styles.select} name="param3" value={formData.param3} onChange={handleFormFieldChange}>
                            {options.param3?.length > 0 ?
                                options.param3.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                )) :
                                (<option value="">Не выбрано</option>)
                            }
                        </select>
                    </div>

                    <div className={styles.field}>
                        <div>
                            <span className={styles.label}>Комментарий:</span>
                        </div>
                        <textarea className={styles.input} name="description" value={formData.description} onChange={handleFormFieldChange} />
                    </div>
                </div>

                <div className={styles.col1}>
                    <img className={styles.image} src={"./public/cat"} alt="Изображение" />
                </div>
            </div>

            <button className={styles.button} type="submit"> Отправить </button>
        </form>
    );
};

export default PetForm;
