'use strict'
import { Model, DataTypes } from "sequelize"
import workAttributes from './interface/NatureOfWork.interface'
import { sequelize } from "./index";

export class NatureOfWork extends Model<workAttributes, never>
    implements workAttributes {
    id!: number;
    name!: string;
}

NatureOfWork.init({
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
        tableName: 'NatureOfWorks',
        modelName: "NatureOfWork",
    })
