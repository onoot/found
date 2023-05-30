import User from '../database/user';
import jwt from "jsonwebtoken";

export default async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = jwt.sign({ email }, 'my-secret-key', { expiresIn: '1h' });

        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict`);
        res.status(201).json({ message: "Пользователь успешно зарегистрирован", token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
