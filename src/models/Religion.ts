'use strict'
import { Model, DataTypes } from "sequelize"
import religionAttributes from './interface/Religion.interface'
import { sequelize } from "./index";

export class Religion extends Model<religionAttributes, never>
    implements religionAttributes {
    id!: number;
    name!: string;
}

Religion.init({
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
        tableName: 'Religions',
        modelName: "Religion",
    })
