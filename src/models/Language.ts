'use strict'
import { Model, DataTypes } from "sequelize"
import languageAttributes from './interface/Language.interface'
import { sequelize } from "./index";

export class Language extends Model<languageAttributes, never>
    implements languageAttributes {
    id!: number;
    name!: string;
}

Language.init({
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
        tableName: 'Languages',
        modelName: "Language",
    })
