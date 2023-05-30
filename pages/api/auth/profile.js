import User from '../database/user'

async function authMiddleware(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: 'Требуется аутентификация' })
    }

    try {
        const user = await User.verifyAuthToken(token)

        if (!user) {
            return res.status(401).json({ message: 'Пользователь не найден' })
        }

        // Если пользователь найден, сохраняем его в `req.user`,
        // чтобы другие middleware и обработчики могли его использовать
        req.user = user

        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: 'Ошибка сервера' })
    }
}

export default authMiddleware
