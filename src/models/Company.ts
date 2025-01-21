'use strict'
import { Model, DataTypes } from "sequelize"
import companyAttributes from './interface/Company.interface'
import { sequelize } from "./index";
import { MainCompany } from "./MainCompany";



export class Company extends Model<companyAttributes, never>
    implements companyAttributes {
    id!: number;
    name!: string;
    main_company_id!: number;
}

Company.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING
    },
    main_company_id: {
        type: DataTypes.INTEGER
    }
},
    {
        sequelize: sequelize,
        tableName: 'Companies',
        modelName: "Company",
    })

    
Company.belongsTo(MainCompany, { foreignKey: 'main_company_id'});