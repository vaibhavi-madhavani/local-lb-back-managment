'use strict'
import { Model, DataTypes } from "sequelize"
import documentTypeAttributes from './interface/DocumentType.interface'
import { sequelize } from "./index";



export class DocumentType extends Model<documentTypeAttributes, never>
    implements documentTypeAttributes {
    id!: number;
    document_type!: string;
}

DocumentType.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    document_type: {
        type: DataTypes.STRING
    }
},
    {
        sequelize: sequelize,
        tableName: 'DocumentTypes',
        modelName: "DocumentType",
    })
