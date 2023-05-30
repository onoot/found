import { Op } from 'sequelize';
import db from './database/ad';

export default async function handler(req, res) {
    const { type, lat, lng } = req.query;

    // Проверяем, что параметры переданы корректно
    if (!lat || !lng || !type) {
        return res.status(400).json({ message: 'Не указаны параметры запроса' });
    }

    // Выполняем поиск объявлений в базе данных, которые соответствуют критериям запроса
    try {
        const ads = await db.Ad.findAll({
            where: {
                type,
                coordinates: {
                    [Op.contains]: {
                        type: 'Point',
                        coordinates: [parseFloat(lng), parseFloat(lat)],
                    },
                },
            },
            include: [{ model: db.User, attributes: ['id', 'name', 'email'] }],
            order: [['createdAt', 'DESC']],
        });
        return res.status(200).json({ data: ads });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Произошла ошибка при поиске объявлений' });
    }
}
