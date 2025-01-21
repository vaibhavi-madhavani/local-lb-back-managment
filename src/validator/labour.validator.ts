import { Segments, Joi, celebrate } from 'celebrate'

export default {
    addLabour: () => celebrate({
        [Segments.BODY]: Joi.object().keys({
            supervisorId: Joi.number(),
            labourId: Joi.number(),
            basicInfo: Joi.object({
                userProfile: Joi.string().required(),
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                middleName: Joi.string().required(),
                nameAsPerAadharCard: Joi.string().required(),
                gender: Joi.string().required(),
                dob: Joi.string().required(),
                maritalStatus: Joi.string().required(),
                fatherName: Joi.string().allow(null),
                husbandName: Joi.string().allow(null),
                presentAddress: Joi.string().required(),
                permanentAddress: Joi.string().required(),
                mobileNumber: Joi.string().required(),
                emergencyMobileNumber: Joi.string().allow(null),
                bloodGroup: Joi.string().allow(null),
                email: Joi.string().email().allow(null),
                cardNumber: Joi.string().allow(null),
                nearestPoliceStation: Joi.string().allow(null),
                knownLanguage: Joi.array().allow(null),
                religion: Joi.array().allow(null),
                covidVaccine: Joi.number().allow(null),
                aadharNumber: Joi.string().required().allow(null),
                panCardNumber: Joi.string().required().allow(null)
            }).optional().allow(null),  // Ensures that basicInfo is present and validated

            professionalDetails: Joi.object({
                hireDate: Joi.date().required(),
                reference: Joi.string().allow(null),
                relationshipWithReference: Joi.string().allow(null),
                referenceContactNumber: Joi.string().allow(null),
            }).optional().allow(null), // Ensures that professionalDetails object is present and validated

            bankDetails: Joi.object({
                bankAccountNumber: Joi.string().allow(null),
                accountHolderName: Joi.string().allow(null),
                bankName: Joi.string().allow(null),
                ifcCode: Joi.string().required(),
                branchName: Joi.string().allow(null),
            }).optional().allow(null),

            documents: Joi.array().items(
                Joi.object({
                    typeId: Joi.number().required(),
                    documents: Joi.string().required(),
                })
            ).optional().allow(null), // Ensures that documents object is present and validated

            nomineeDetails: Joi.array().items(
                Joi.object({
                    name: Joi.string().required(),
                    aadharNumber: Joi.string()
                        // .pattern(/^\d{12}$/)
                        .required(),
                    // .messages({ 'string.pattern.base': 'Aadhar Number must be a 12-digit number.' }),
                    dob: Joi.date(),
                    nomineePercentage: Joi.number().required(),
                    address: Joi.string().required(),
                    userProfile: Joi.string().allow(null),
                    relationwithnominee: Joi.string().allow(null)
                })
            ).optional().allow(null), // nomineeDetails is optional

            workDetails: Joi.object({
                occupation: Joi.array(),
                natureOfWork: Joi.array().required(),
                category: Joi.array().required(),
                department: Joi.string(),
                dateOfLeave: Joi.date(),
                previousOrganizationName: Joi.string().required(),
                dateOfExitPreviousEmployer: Joi.date(),
                reasonOfLeave: Joi.string(),
                workExperience: Joi.string(),
                providentFundNumber: Joi.string(),
                universalAccountNumber: Joi.string(),
                employeeStateInsurance: Joi.string()
            }).optional().allow(null)
        }),
    })
}