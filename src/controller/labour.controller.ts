import { Request, Response } from 'express';
import Sequelize from 'sequelize';
import { Labour } from '../models/Labour';
import { Document } from '../models/Document';
const _ = require('lodash');

const addLabour = async (req: Request, res: Response) => {
    try {
        let { supervisorId, basicInfo, professionalDetails, bankDetails, nomineeDetails, workDetails, labourId, documents } = req.body;

        /** Basic information */
        if (basicInfo && (basicInfo.knownLanguage || basicInfo.religion)) {
            basicInfo.knownLanguage = JSON.stringify(basicInfo.knownLanguage);
            basicInfo.religion = JSON.stringify(basicInfo.religion);
        }

        /** Work details */
        if (workDetails && (workDetails.occupation || workDetails.natureOfWork || workDetails.category)) {
            workDetails.occupation = JSON.stringify(workDetails.occupation);
            workDetails.natureOfWork = JSON.stringify(workDetails.natureOfWork);
            workDetails.category = JSON.stringify(workDetails.category);
        }
        // Step 1: Merge basicInfo, documents, accountDetails into one object using spread operator
        const mergedObject = {
            ...basicInfo,
            ...professionalDetails,
            ...bankDetails,
            ...workDetails,
        };

        // Step 2: Stringify nomineeDetails (optional fields) if present
        const nomineeData = {
            nomineeDetails: JSON.stringify(nomineeDetails ? nomineeDetails : undefined)
        };

        // Step 3: Combine merged object with nomineeData
        const createOrUpdateObject = {
            ...mergedObject,
            ...nomineeData,
            supervisorId
        };

        /** Check if documents are present */
        if (documents && documents.length > 0) {
            for (let i = 0; i < documents.length; i++) {
                const typeIdsInPayload = documents.map((doc: any) => doc.typeId);

                // Delete documents with typeIds not in the payload
                await Document.destroy({
                    where: {
                        userId: labourId,
                        typeId: { [Sequelize.Op.notIn]: typeIdsInPayload }
                    }
                });

                let document = documents[i];
                let documentExists = await Document.findOne({ where: { userId: labourId, typeId: document.typeId } });
                if (documentExists) {
                    await Document.update({ documents: document.documents }, { where: { userId: labourId, typeId: document.typeId } });
                } else {
                    let createObject: any = {
                        userId: labourId,
                        typeId: document.typeId,
                        documents: document.documents
                    }
                    await Document.create(createObject);
                }
            }
            return res.status(200).send({
                status: true, message: 'Labour information updated successfully'
            });
        }

        if (labourId) {

            // Update operation
            let labourExists = await Labour.findByPk(labourId);

            if (!labourExists) {
                return res.status(404).send({
                    status: false,
                    message: 'Labour not found'
                });
            }

            await Labour.update(createOrUpdateObject, {
                where: { id: labourId },
            });

            return res.status(200).send({
                status: true,
                message: 'Labour information updated successfully'
            });
        } else {
            // Create operation
            let createData = await Labour.create(createOrUpdateObject);
            return res.status(200).send({ status: true, message: 'Labour Added', data: createData });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: 'Server Error' });
    }
}

const getAllLabour = async (req: Request, res: Response) => {
    try {
        let GetAllLabour: any = await Labour.findAll({ raw: true });
        return res.status(200).send({ status: true, message: 'Get all', data: GetAllLabour });
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: 'Server Error' });
    }
}

const getOne = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Step 1: Fetch the record from the Labour table
        const getOne = await Labour.findOne({ where: { id: id }, raw: true });

        if (!getOne) {
            return res.status(404).send({ status: false, message: 'Labour record not found' });
        }

        // Step 2: Fetch related documents from the `documents` table
        const documents = await Document.findAll({ where: { userId: id }, raw: true });

        // Format documents for response
        const formattedDocuments = documents.map(doc => ({
            id: doc.id,
            documentUrl: global.config.API_BASE_URL + '/documents/' + doc.documents,
        }));

        // Step 3: Prepare the response in the desired format
        const prepareResponse = (data: any) => {
            return {
                supervisorId: data.supervisorId || null,

                // Check if any key has a non-null value using Lodash
                basicInfo: _.some(data.basicInfo) ? data.basicInfo : null,
                documents: _.some(data.documents) ? data.documents : null,
                professionalDetails: _.some(data.professionalDetails) ? data.professionalDetails : null,
                nomineeDetails: _.some(data.nomineeDetails) ? data.nomineeDetails : null,
                workDetails: _.some(data.workDetails) ? data.workDetails : null,
            };
        };

        // Create the response data object
        const responseData = {
            supervisorId: getOne.supervisorId,
            basicInfo: {
                id: getOne.id,
                userProfile: global.config.API_BASE_URL + '/' + 'user_profile' + '/' + getOne.userProfile,
                cardNumber: getOne.cardNumber,
                firstName: getOne.firstName,
                middleName: getOne.middleName,
                lastName: getOne.lastName,
                nameAsPerAadharCard: getOne.nameAsPerAadharCard,
                gender: getOne.gender,
                dob: getOne.dob,
                maritalStatus: getOne.maritalStatus,
                fatherName: getOne.fatherName,
                husbandName: getOne.husbandName,
                bloodGroup: getOne.bloodGroup,
                mobileNumber: getOne.mobileNumber,
                email: getOne.email,
                emergencyMobileNumber: getOne.emergencyMobileNumber,
                presentAddress: getOne.presentAddress,
                permanentAddress: getOne.permanentAddress,
                nearestPoliceStation: getOne.nearestPoliceStation,
                knownLanguage: JSON.parse(getOne.knownLanguage || '[]'),
                religion: JSON.parse(getOne.religion || '[]'),
                covidVaccine: getOne.covidVaccine,
                aadharNumber: getOne.aadharNumber,
                panCardNumber: getOne.panCardNumber,
            },
            documents: formattedDocuments,
            professionalDetails: {
                hireDate: getOne.hireDate,
                reference: getOne.reference,
                relationshipWithReference: getOne.relationshipWithReference,
                referenceContactNumber: getOne.referenceContactNumber,
            },
            bankDetails: {
                bankAccountNumber: getOne.bankAccountNumber,
                accountHolderName: getOne.accountHolderName,
                ifcCode: getOne.ifcCode,
                bankName: getOne.bankName,
                branchName: getOne.branchName,
            },
            nomineeDetails: JSON.parse(getOne.nomineeDetails || '[]'),
            workDetails: {
                occupation: JSON.parse(getOne.occupation),
                natureOfWork: JSON.parse(getOne.natureOfWork),
                category: JSON.parse(getOne.category),
                department: getOne.department,
                dateOfLeave: getOne.dateOfLeave,
                previousOrganizationName: getOne.previousOrganizationName,
                dateOfExitPreviousEmployer: getOne.dateOfExitPreviousEmployer,
                reasonOfLeave: getOne.reasonOfLeave,
                workExperience: getOne.workExperience,
                providentFundNumber: getOne.providentFundNumber,
                universalAccountNumber: getOne.universalAccountNumber,
                employeeStateInsurance: getOne.employeeStateInsurance,
            },
        };

        // Apply `prepareResponse` to filter the response
        const response = prepareResponse(responseData);

        // Step 4: Send the response
        return res.status(200).send({ status: true, message: 'Get Data', data: response });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, message: 'Server Error' });
    }
};

const uploadFiles = (req: any, res: Response) => {
    try {
        let typeId = req.body
        let files;
        // Step 1: Get the uploaded file from the request object
        if (req.files && typeId) {
            files = req.files
        } else {
            files = req.file;
        }

        // Step 2: Check if a file was uploaded
        if (!files) {
            return res.status(400).send({ status: false, message: 'No file uploaded' });
        }
        // Step 4: Send the response
        return res.status(200).send({ status: true, message: 'File uploaded successfully', data: files });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ status: false, message: 'Server Error' });
    }
}

export = { addLabour, getAllLabour, getOne, uploadFiles }