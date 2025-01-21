'use strict'
import { Model, DataTypes } from "sequelize"
import userAttributes from './interface/User.interface'
import { sequelize } from "./index";
import { Role } from "./Role";
import { Company } from "./Company";

export class User extends Model<userAttributes, never>
    implements userAttributes {
    id!: number;
    firstName!: string;
    lastName!: string;
    email!: string;
    password!: string;
    roleId!: number;
    otp!: string
    otp_expire_time!: Date
    companyId!: number
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    roleId: {
        type: DataTypes.INTEGER
    },
    otp: {
        type: DataTypes.STRING
    },
    otp_expire_time: {
        type: DataTypes.DATE
    },
    companyId: {
        type: DataTypes.INTEGER
    }
},
    {
        sequelize: sequelize,
        tableName: 'User',
        modelName: "User",
    })

User.belongsTo(Role, { foreignKey: 'roleId' });
User.belongsTo(Company, { foreignKey: 'companyId' });