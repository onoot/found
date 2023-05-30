import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        res.status(401).json({ message: "Требуется авторизация" });
        return;
    }

    try {
        const decoded = jwt.verify(token, 'my-secret-key');
        req.email = decoded.email;
        res.status(200).json({ message: "Ок" });
    } catch (error) {
        res.status(401).json({ message: "Недействительный токен авторизации" });
    }
};

export default auth;
