import React, { useState, useEffect } from "react";
import { YMaps, Map, Placemark, ZoomControl, GeolocationControl } from "react-yandex-maps";
import styles from "../../styles/Home.module.css";
import { toast } from "react-toastify";
import PetADD from "../ads/peradd";

const MyBulletins = () => {
    const [placemarks, setPlacemarks] = useState([]);
    const [isLostPetActive, setIsLostPetActive] = useState(true);
    const [searchError, setSearchError] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        petType: "",
        petBreed: "",
        description: "",
        image: null,
        isLostPet: true,
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newPlacemarkCoordinates, setNewPlacemarkCoordinates] = useState(null);

    useEffect(() => {
        const fetchPlacemarks = async () => {
            try {
                const response = await fetch("/api/map");
                const json = await response.json();
                setPlacemarks(json);
            } catch (err) {
                console.log(err);
            }
        };
        fetchPlacemarks();
    }, []);

    const handleButtonClick = (type) => {
        const isLostPet = type === "lost";
        setIsLostPetActive(isLostPet);

        // Скрываем форму, если одна и та же кнопка была нажата 2 раза подряд
        if (isFormVisible && isLostPet === formData.isLostPet) {
            setIsFormVisible(false);
            return;
        }

        // Отображаем форму и обновляем isLostPet в formData
        setIsFormVisible(true);
        setFormData((prevData) => ({ ...prevData, isLostPet }));
    };

    const getPlacemarkOptions = (type) => {
        const options = {
            iconLayout: "default#image",
            iconImageSize: [45, 45],
            iconImageOffset: [-22.5, -45],
        };
        switch (type) {
            case "lost":
                return {
                    ...options,
                    iconImageHref: "/red.svg",
                };
            case "found":
                return {
                    ...options,
                    iconImageHref: "/green.svg",
                };
            case "new":
                return {
                    ...options,
                    iconImageHref: "/yandex.svg",
                };
            default:
                return options;
        }
    };

    const handleGeolocationClick = () => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setMapState({ center: [latitude, longitude], zoom: 15 });
                },
                () => {
                    toast.error(
                        "Произошла ошибка при определении местоположения. Пожалуйста, разрешите доступ к геопозиции или попробуйте позже.",
                        { position: "top-right" }
                    );
                }
            );
        } else {
            toast.error("Геопозиция не поддерживается данным браузером.", {
                position: "top-right",
            });
        }
    };

    const [mapState, setMapState] = useState({
        center: [55.753994, 37.622093],
        zoom: 15,
    });

    const handleFormFieldChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const { name, phone, petType, petBreed, description, image } = formData;
        const type = isLostPetActive ? "lost" : "found";
        const coordinates = newPlacemarkCoordinates || mapState.center; // используем новые координаты метки, если они есть
        const data = new FormData();
        data.append("name", name);
        data.append("phone", phone);
        data.append("petType", petType);
        data.append("petBreed", petBreed);
        data.append("description", description);
        if (image) {
            data.append("image", image);
        }
        data.append("type", type);
        data.append("coordinates", JSON.stringify(coordinates));

        try {
            const response = await fetch("/api/ads", {    method: "POST",
                body: data,
            });
            const { success, message } = await response.json();
            if (success) {
                toast.success(message, { position: "top-right" });
                setFormData({
                    name: "",
                    phone: "",
                    petType: "",
                    petBreed: "",
                    description: "",
                    image: null,
                    isLostPet: isLostPetActive,
                });
                setIsFormVisible(false);
                setNewPlacemarkCoordinates(null); // очистить сохраненные координаты метки после отправки формы
            } else {
                toast.error(message, { position: "top-right" });
            }
        } catch (err) {
            toast.error("Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.", {
                position: "top-right",
            });
        }};

    const handleMapClick = (event) => { const coordinates = event.get("coords");
        setNewPlacemarkCoordinates(coordinates);
        // сохраняем координаты метки в состоянии
        setIsFormVisible(true); setFormData((prevData) => ({ ...prevData, isLostPet: isLostPetActive }));
    };
    return (
        <YMaps>
            {isFormVisible && (
                <div className={styles.control}>

                </div>
            )}

            <Map state={mapState} width="100%" height="1000px" onClick={handleMapClick}>
                <GeolocationControl options={{ float: "left" }} onClick={handleGeolocationClick} />
                <ZoomControl options={{ float: "right" }} />
                {searchError && (
                    <div className={styles.error}>В данной локации объявлений не найдено.</div>
                )}
                <div className={styles.control}>
                    <PetADD
                        formData={formData}
                        handleFormFieldChange={handleFormFieldChange}
                        handleFormSubmit={handleFormSubmit}
                        coordinates={newPlacemarkCoordinates || mapState.center}
                    />
                </div>
                {placemarks.length > 0 &&
                    placemarks.map((placemark, i) => (
                        <Placemark
                            key={`placemark-${i}`}
                            geometry={placemark.coordinates}
                            options={getPlacemarkOptions(placemark.type)}
                        />
                    ))}
                {newPlacemarkCoordinates && (
                    // добавление новой метки, только если есть сохраненные координаты
                    <Placemark
                        geometry={newPlacemarkCoordinates}
                        options={getPlacemarkOptions("new")}
                    />
                )}
            </Map>
        </YMaps>
    ); };

export default MyBulletins;

