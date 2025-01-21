'use strict'
import { Model, DataTypes } from "sequelize"
import documentAttributes from './interface/Document.interface'
import { sequelize } from "./index";
import { DocumentType } from "./DocumentType";

export enum userType {
    LABOUR = 'labour',
    USER = 'user',
}

export class Document extends Model<documentAttributes, never>
    implements documentAttributes {
    id!: number;
    userId!: number;
    typeId!: number;
    userType!: string
    documents!: string
}

Document.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER
    },
    typeId: {
        type: DataTypes.INTEGER
    },
    userType: {
        type: DataTypes.ENUM,
        values: Object.values(userType),
        allowNull: true,
        defaultValue: userType.LABOUR
    },
    documents: {
        type: DataTypes.TEXT("long")
    }
},
    {
        sequelize: sequelize,
        tableName: 'Document',
        modelName: "Document",
    })
Document.belongsTo(DocumentType, { foreignKey: 'typeId' });