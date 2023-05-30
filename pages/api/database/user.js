// user.js

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { DataTypes } from 'sequelize';
import {sequelize} from './sequelize';

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    hooks: {
        beforeCreate: async (user) => {
            user.password
        },
    },
});

User.verifyAuthToken = async function(token) {
    try {
        const decoded = jwt.verify(token, 'my-secret-key');
        const user = await User.findOne({ where: { email: decoded.email } });
        return { user };
    } catch (error) {
        console.error(error);
        throw new Error('Invalid token');
    }
};

User.authenticate = async function(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return null;
    }


    if (!password==user.password) {
        return null;
    }

    const token = jwt.sign({ email }, 'my-secret-key', { expiresIn: '1h' });

    return { user, token };
};

export default User;
