import User from '../database/user';
export default async (req, res) => {
    const { email, password } = req.body;


    try {
        const result = await User.authenticate(email, password);


        if (!result) {
            res.status(401).json({ message: "Email или пароль неверны" });
            return;
        }

        const { user, token } = result;
        res.setHeader('Set-Cookie', `token=${token}; HttpOnly; Secure; SameSite=Strict`);
        res.status(200).json({ message: "Вы успешно вошли в систему", token });


    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
