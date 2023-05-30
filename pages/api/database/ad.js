import { Model, DataTypes } from 'sequelize';
import {sequelize} from './sequelize';
import User from './user';

export class Ad extends Model {}

Ad.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        coordinates: {
            type: DataTypes.JSONB,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        street: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        house: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        entrance: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        floor: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        apartment: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        animal_type: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM('male', 'female', 'unknown'),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM('lost', 'found'),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date_of_birth: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        date_of_loss: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        timestamps: true,
        paranoid: true,
        modelName: 'Ad',
        indexes: [
            {
                fields: ['type', 'coordinates'],
            },
        ],
    }
);

Ad.belongsTo(User, { foreignKey: 'user_id' });

export default Ad;
