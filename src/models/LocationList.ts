'use strict'
import { Model, DataTypes } from "sequelize"
import locationAttributes from './interface/LocationList.interface'
import { sequelize } from "./index";

export class LocationList extends Model<locationAttributes, never>
    implements locationAttributes {
    id!: number;
    name!: string;
}

LocationList.init({
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
        tableName: 'LocationLists',
        modelName: "LocationList",
    })
