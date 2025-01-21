'use strict'
import { Model, DataTypes } from "sequelize"
import occupationAttributes from './interface/Occupation.interface'
import { sequelize } from "./index";

export class Occupation extends Model<occupationAttributes, never>
    implements occupationAttributes {
    id!: number;
    name!: string;
}

Occupation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    }
},
    {
        sequelize: sequelize,
        tableName: 'Occupations',
        modelName: "Occupation",
    })
