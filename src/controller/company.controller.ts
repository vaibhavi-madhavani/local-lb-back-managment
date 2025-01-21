import { Request, Response } from 'express';
import { MainCompany } from '../models/MainCompany';
import { Company } from '../models/Company';
import { User } from '../models/User';
import { encrypt } from '../helper/auth.service';


/** Create Main Company */
const addMainCompanies = async (req: Request, res: Response) => {
    try {
        let { name, location_id } = req.body

        let CheckMainCompanyExist: any = await MainCompany.findOne({ where: { name: name }, raw: true })
        if (CheckMainCompanyExist) {
            return res.status(400).send({ status: false, message: 'MainCompany Already Exists' })
        }
        let createObject: any = {
            name: name,
            location_id: location_id
        }
        await MainCompany.create(createObject)
        return res.status(200).send({ status: true, message: 'MainCompany Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All Main Companies */
const getMainCompanies = async (req: Request, res: Response) => {
    try {
        let getAllMainCompanies: any = await MainCompany.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully MainCompany Fetched', data: getAllMainCompanies })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get Main Companies by id */
const getMainCompaniesById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getMainCompanies: any = await MainCompany.findOne({ where: { id: id }, raw: true })
        if (!getMainCompanies) {
            return res.status(400).send({ status: false, message: 'MainCompany Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully MainCompany Fetched', data: getMainCompanies })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update Main Company By id */
const updateMainCompany = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name, location_id } = req.body
        let getMainCompany: any = await MainCompany.findOne({ where: { id: id }, raw: true })
        if (!getMainCompany) {
            return res.status(400).send({ status: false, message: 'MainCompany Not Found' })
        }
        await MainCompany.update({ name: name, location_id: location_id }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully MainCompany Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete Main Company */
const deleteMainCompany = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getMainCompany: any = await MainCompany.findOne({ where: { id: id }, raw: true })
        if (!getMainCompany) {
            return res.status(400).send({ status: false, message: 'MainCompany Not Found' })
        }
        await MainCompany.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully MainCompany Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Create Companies */
const addCompanies = async (req: Request, res: Response) => {
    try {
        let { name, main_company_id } = req.body

        let CheckCompanyExist: any = await Company.findOne({ where: { name: name }, raw: true })
        if (CheckCompanyExist) {
            return res.status(400).send({ status: false, message: 'Company Already Exists' })
        }
        let createObject: any = {
            name: name,
            main_company_id: main_company_id
        }
        await Company.create(createObject)
        return res.status(200).send({ status: true, message: 'Company Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All Main Companies */
const getAllCompanies = async (req: Request, res: Response) => {
    try {
        let getAllCompanies: any = await Company.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully Company Fetched', data: getAllCompanies })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get Companies by id */
const getCompaniesById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getCompanies: any = await Company.findOne({ where: { id: id }, raw: true })
        if (!getCompanies) {
            return res.status(400).send({ status: false, message: 'Company Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully Company Fetched', data: getCompanies })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update Company By id */
const updateCompany = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name, main_company_id } = req.body
        let getCompanies: any = await Company.findOne({ where: { id: id }, raw: true })
        if (!getCompanies) {
            return res.status(400).send({ status: false, message: 'Company Not Found' })
        }
        await Company.update({ name: name, main_company_id: main_company_id }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Company Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete Company */
const deleteCompanies = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getCompany: any = await Company.findOne({ where: { id: id }, raw: true })
        if (!getCompany) {
            return res.status(400).send({ status: false, message: 'Company Not Found' })
        }
        await Company.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Company Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** add Super Admin  */
const addSuperAdmin = async (req: Request, res: Response) => {
    try {
        let { email, password, firstName, lastName, roleId, companyId } = req.body;

        let CheckEmailExist: any = await User.findOne({ where: { email: email }, raw: true });
        if (CheckEmailExist) {
            return res.status(400).send({ status: false, message: "Email Already Exists" });
        }

        let createObject: any = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            roleId: roleId,
            companyId: companyId,
            password: await encrypt(password)
        }
        let createData: any = await User.create(createObject);

        if (createData) {
            return res.status(200).send({ status: true, message: 'Super Admin Registered Successfully' });
        } else {
            return res.status(400).send({ status: false, message: 'Something Went Wrong' });
        }
    } catch (err) {
        console.log(err)
        return res.status(500).send({ status: false, message: 'Server Error' });
    }
}

/** Get SUper Admin by id */
const getSuperAdminById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getSuperAdminById: any = await User.findOne({ where: { id: id }, raw: true })
        if (!getSuperAdminById) {
            return res.status(400).send({ status: false, message: 'Super Admin Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully User Fetched', data: getSuperAdminById })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update Super Admin By id */
const updateSuperAdminById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { email, password, firstName, lastName, roleId } = req.body
        let getSuperAdmin: any = await User.findOne({ where: { id: id }, raw: true })
        if (!getSuperAdmin) {
            return res.status(400).send({ status: false, message: 'Super Admin Not Found' })
        }
        let updateObj: any = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            roleId: roleId,
            password: await encrypt(password)
        }
        await User.update(updateObj, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Super Admin Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete Super Admin */
const deleteSuperAdmin = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getSuperAdmin: any = await User.findOne({ where: { id: id }, raw: true })
        if (!getSuperAdmin) {
            return res.status(400).send({ status: false, message: 'Super Admin Not Found' })
        }
        await User.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Super Admin Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All Companies Super Admin List */
const getAllCompaniesSuperAdmin = async (req: Request, res: Response) => {
    try {
        let { companyId } = req.params;
        let getAllCompaniesSuperAdmin: any = await User.findAll({ where: { companyId: companyId }, raw: true })
        if (!getAllCompaniesSuperAdmin) {
            return res.status(400).send({ status: false, message: 'Super Admin Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully Super Admin Data Fetched', data: getAllCompaniesSuperAdmin })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

export default {
    addMainCompanies, getMainCompanies, getMainCompaniesById, updateMainCompany, deleteMainCompany,
    getAllCompanies, getCompaniesById, updateCompany, deleteCompanies, addCompanies,
    addSuperAdmin, getSuperAdminById, updateSuperAdminById, deleteSuperAdmin, getAllCompaniesSuperAdmin
}