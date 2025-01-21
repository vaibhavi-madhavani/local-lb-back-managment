'use strict'
import { Model, DataTypes } from "sequelize"
import labourAttributes from './interface/Labour.interface'
import { sequelize } from "./index";
import { User } from "./User";

export enum gender {
    MALE = 'male',
    FEMALE = 'female',
    OTHER = 'other'
}
export enum maritalStatus {
    MARRIED = 'married',
    UNMARRIED = 'unmarried'
}


export class Labour extends Model<labourAttributes, never>
    implements labourAttributes {
    id!: number;
    supervisorId!: number;
    userProfile!: string;
    firstName!: string;
    lastName!: string;
    middleName!: string;
    nameAsPerAadharCard!: string;
    gender!: string;
    dob!: Date;
    maritalStatus!: string;
    fatherName!: string;
    husbandName!: string;
    mobileNumber!: string;
    email!: string;
    category!: string;
    natureOfWork!: string;
    knownLanguage!: string;
    religion!: string;
    occupation!: string;
    department!: string;
    emergencyMobileNumber!: string;
    nomineeDetails!: string;
    presentAddress!: string;
    permanentAddress!: string;
    providentFundNumber!: string;
    universalAccountNumber!: string;
    employeeStateInsurance!: string;
    bloodGroup!: string;
    workExperience!: string;
    previousOrganizationName!: string;
    dateOfExitPreviousEmployer!: Date;
    dateOfLeave!: Date;
    reasonOfLeave!: string;
    covidVaccine!: boolean;
    aadharNumber!: string;
    panCardNumber!: string;
    nearestPoliceStation!: string;
    cardNumber!: string;
    bankAccountNumber!: string;
    accountHolderName!: string;
    bankName!: string;
    ifcCode!: string;
    branchName!: string;
    hireDate!: Date;
    reference!: string;
    relationshipWithReference!: string;
    referenceContactNumber!: string;
}

Labour.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    supervisorId: {
        type: DataTypes.INTEGER
    },
    userProfile: {
        type: DataTypes.STRING
    },
    firstName: {
        type: DataTypes.STRING
    },
    middleName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    nameAsPerAadharCard: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.ENUM,
        values: Object.values(gender),
        allowNull: true
    },
    dob: {
        type: DataTypes.DATE
    },
    maritalStatus: {
        type: DataTypes.ENUM,
        values: Object.values(maritalStatus),
        allowNull: true
    },
    fatherName: {
        type: DataTypes.STRING
    },
    husbandName: {
        type: DataTypes.STRING
    },
    mobileNumber: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    knownLanguage: {
        type: DataTypes.STRING
    },
    religion: {
        type: DataTypes.STRING
    },
    emergencyMobileNumber: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    nomineeDetails: {
        type: DataTypes.TEXT("long")
    },
    natureOfWork: {
        type: DataTypes.STRING
    },
    occupation: {
        type: DataTypes.STRING
    },
    department: {
        type: DataTypes.STRING
    },
    nearestPoliceStation: {
        type: DataTypes.STRING
    },
    hireDate: {
        type: DataTypes.DATE
    },
    presentAddress: {
        type: DataTypes.STRING
    },
    permanentAddress: {
        type: DataTypes.STRING
    },
    bankAccountNumber: {
        type: DataTypes.STRING
    },
    accountHolderName: {
        type: DataTypes.STRING
    },
    ifcCode: {
        type: DataTypes.STRING
    },
    bankName: {
        type: DataTypes.STRING
    },
    branchName: {
        type: DataTypes.STRING
    },
    providentFundNumber: {
        type: DataTypes.STRING
    },
    universalAccountNumber: {
        type: DataTypes.STRING
    },
    employeeStateInsurance: {
        type: DataTypes.STRING
    },
    bloodGroup: {
        type: DataTypes.STRING
    },
    workExperience: {
        type: DataTypes.STRING
    },
    previousOrganizationName: {
        type: DataTypes.STRING
    },
    dateOfExitPreviousEmployer: {
        type: DataTypes.DATE
    },
    dateOfLeave: {
        type: DataTypes.DATE
    },
    reasonOfLeave: {
        type: DataTypes.STRING
    },
    covidVaccine: {
        type: DataTypes.BOOLEAN
    },
    aadharNumber: {
        type: DataTypes.STRING
    },
    panCardNumber: {
        type: DataTypes.STRING
    },
    cardNumber: {
        type: DataTypes.STRING
    },
    reference: {
        type: DataTypes.STRING
    },
    relationshipWithReference: {
        type: DataTypes.STRING
    },
    referenceContactNumber: {
        type: DataTypes.STRING
    }
},
    {
        sequelize: sequelize,
        tableName: 'Labour',
        modelName: "Labour",
    })

Labour.belongsTo(User, { foreignKey: 'supervisorId' });