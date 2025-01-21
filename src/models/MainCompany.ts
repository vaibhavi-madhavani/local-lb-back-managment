'use strict'
import { Model, DataTypes } from "sequelize"
import mainCompanyAttributes from './interface/MainCompany.interface'
import { sequelize } from "./index";



export class MainCompany extends Model<mainCompanyAttributes, never>
    implements mainCompanyAttributes {
    id!: number;
    name!: string;
    location_id!: number;
}

MainCompany.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    },
    location_id: {
        type: DataTypes.INTEGER
    }
},
    {
        sequelize: sequelize,
        tableName: 'MainCompanies',
        modelName: "MainCompany",
    })
