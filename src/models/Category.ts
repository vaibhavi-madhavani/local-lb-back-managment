'use strict'
import { Model, DataTypes } from "sequelize"
import categoryAttributes from './interface/Category.interface'
import { sequelize } from "./index";

export class Category extends Model<categoryAttributes, never>
    implements categoryAttributes {
    id!: number;
    name!: string;
}

Category.init({
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
        tableName: 'Categories',
        modelName: "Category",
    })
