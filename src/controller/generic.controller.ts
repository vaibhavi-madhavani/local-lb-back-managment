import { Request, Response } from 'express';
import { Language } from '../models/Language';
import { Category } from '../models/Category';
import { NatureOfWork } from '../models/NatureOfWork';
import { Religion } from '../models/Religion';
import { Occupation } from '../models/Occupation';
import { DocumentType } from '../models/DocumentType';
import { LocationList } from '../models/LocationList';

/** Create Languages */
const addLanguages = async (req: Request, res: Response) => {
    try {
        let { name } = req.body

        let CheckLanguageExist: any = await Language.findOne({ where: { name: name }, raw: true })
        if (CheckLanguageExist) {
            return res.status(400).send({ status: false, message: 'Language Already Exists' })
        }
        let createObject: any = {
            name: name,
        }
        await Language.create(createObject)
        return res.status(200).send({ status: true, message: 'Language Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All Languages */
const getLanguages = async (req: Request, res: Response) => {
    try {
        let getAllLanguages: any = await Language.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully Languages Fetched', data: getAllLanguages })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get Languages by id */
const getLanguagesById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getLanguage: any = await Language.findOne({ where: { id: id }, raw: true })
        if (!getLanguage) {
            return res.status(400).send({ status: false, message: 'Language Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully Language Fetched', data: getLanguage })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update Languages By id */
const updateLanguage = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name } = req.body
        let getLanguage: any = await Language.findOne({ where: { id: id }, raw: true })
        if (!getLanguage) {
            return res.status(400).send({ status: false, message: 'Language Not Found' })
        }
        await Language.update({ name: name }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Language Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete Languages */
const deleteLanguage = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getLanguage: any = await Language.findOne({ where: { id: id }, raw: true })
        if (!getLanguage) {
            return res.status(400).send({ status: false, message: 'Language Not Found' })
        }
        await Language.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Language Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Create Category */
const addCategory = async (req: Request, res: Response) => {
    try {
        let { name } = req.body

        let CheckLanguageExist: any = await Category.findOne({ where: { name: name }, raw: true })
        if (CheckLanguageExist) {
            return res.status(400).send({ status: false, message: 'Category Already Exists' })
        }
        let createObject: any = {
            name: name,
        }
        await Category.create(createObject)
        return res.status(200).send({ status: true, message: 'Category Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All Categories */
const getCategories = async (req: Request, res: Response) => {
    try {
        let getAllCategories: any = await Category.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully Categories Fetched', data: getAllCategories })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get Category by id */
const getCategoriesById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getCategory: any = await Category.findOne({ where: { id: id }, raw: true })
        if (!getCategory) {
            return res.status(400).send({ status: false, message: 'Category Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully Category Fetched', data: getCategory })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update Category By id */
const updateCategory = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name } = req.body
        let getCategory: any = await Category.findOne({ where: { id: id }, raw: true })
        if (!getCategory) {
            return res.status(400).send({ status: false, message: 'Category Not Found' })
        }
        await Category.update({ name: name }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Category Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete Categories */
const deleteCategory = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getLanguage: any = await Category.findOne({ where: { id: id }, raw: true })
        if (!getLanguage) {
            return res.status(400).send({ status: false, message: 'Category Not Found' })
        }
        await Category.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Category Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}


/** Create Nature of work */
const addNatureOfWork = async (req: Request, res: Response) => {
    try {
        let { name } = req.body

        let CheckWorkExist: any = await NatureOfWork.findOne({ where: { name: name }, raw: true })
        if (CheckWorkExist) {
            return res.status(400).send({ status: false, message: 'Nature of work Already Exists' })
        }
        let createObject: any = {
            name: name,
        }
        await NatureOfWork.create(createObject)
        return res.status(200).send({ status: true, message: 'Nature of work Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All nature of work */
const getNatureOfWork = async (req: Request, res: Response) => {
    try {
        let getAllNatureOfWorks: any = await NatureOfWork.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully Nature of work Fetched', data: getAllNatureOfWorks })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get Nature of work by id */
const getNatureOfWorkById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getNatureOfWork: any = await NatureOfWork.findOne({ where: { id: id }, raw: true })
        if (!getNatureOfWork) {
            return res.status(400).send({ status: false, message: 'Nature of work Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully Category Fetched', data: getNatureOfWork })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update nature of work By id */
const updateNatureOfWork = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name } = req.body
        let getNatureOfWork: any = await NatureOfWork.findOne({ where: { id: id }, raw: true })
        if (!getNatureOfWork) {
            return res.status(400).send({ status: false, message: 'Nature of work Not Found' })
        }
        await NatureOfWork.update({ name: name }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Nature of work Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete nature of work */
const deleteNatureOfWork = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getNatureOfWork: any = await NatureOfWork.findOne({ where: { id: id }, raw: true })
        if (!getNatureOfWork) {
            return res.status(400).send({ status: false, message: 'Nature Of Work Not Found' })
        }
        await NatureOfWork.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Nature Of Work Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Create Religion */
const addReligion = async (req: Request, res: Response) => {
    try {
        let { name } = req.body

        let CheckReligionExist: any = await Religion.findOne({ where: { name: name }, raw: true })
        if (CheckReligionExist) {
            return res.status(400).send({ status: false, message: 'Religion Already Exists' })
        }
        let createObject: any = {
            name: name,
        }
        await Religion.create(createObject)
        return res.status(200).send({ status: true, message: 'Religion Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All Religion */
const getReligions = async (req: Request, res: Response) => {
    try {
        let getAllReligions: any = await Religion.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully Religion Fetched', data: getAllReligions })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get Religion by id */
const getReligionById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getReligion: any = await Religion.findOne({ where: { id: id }, raw: true })
        if (!getReligion) {
            return res.status(400).send({ status: false, message: 'Religion Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully Religion Fetched', data: getReligion })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update Religion By id */
const updateReligion = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name } = req.body
        let getReligion: any = await Religion.findOne({ where: { id: id }, raw: true })
        if (!getReligion) {
            return res.status(400).send({ status: false, message: 'Religion Not Found' })
        }
        await Religion.update({ name: name }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Religion Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete Religion */
const deleteReligion = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getReligion: any = await Religion.findOne({ where: { id: id }, raw: true })
        if (!getReligion) {
            return res.status(400).send({ status: false, message: 'Religion Not Found' })
        }
        await Religion.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Religion Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Create Occupation */
const addOccupation = async (req: Request, res: Response) => {
    try {
        let { name } = req.body

        let CheckOccupationExist: any = await Occupation.findOne({ where: { name: name }, raw: true })
        if (CheckOccupationExist) {
            return res.status(400).send({ status: false, message: 'Occupation Already Exists' })
        }
        let createObject: any = {
            name: name,
        }
        await Occupation.create(createObject)
        return res.status(200).send({ status: true, message: 'Occupation Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All Occupation */
const getOccupations = async (req: Request, res: Response) => {
    try {
        let getAllOccupations: any = await Occupation.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully Occupation Fetched', data: getAllOccupations })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get Occupation by id */
const getOccupationById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getOccupation: any = await Occupation.findOne({ where: { id: id }, raw: true })
        if (!getOccupation) {
            return res.status(400).send({ status: false, message: 'Occupation Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully Occupation Fetched', data: getOccupation })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update Occupation By id */
const updateOccupation = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name } = req.body
        let getOccupation: any = await Occupation.findOne({ where: { id: id }, raw: true })
        if (!getOccupation) {
            return res.status(400).send({ status: false, message: 'Occupation Not Found' })
        }
        await Occupation.update({ name: name }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Occupation Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete Occupation */
const deleteOccupation = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getOccupation: any = await Occupation.findOne({ where: { id: id }, raw: true })
        if (!getOccupation) {
            return res.status(400).send({ status: false, message: 'Occupation Not Found' })
        }
        await Occupation.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully Occupation Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Create DocumentType */
const addDocumentType = async (req: Request, res: Response) => {
    try {
        let { name } = req.body

        let CheckDocumentTypeExist: any = await DocumentType.findOne({ where: { document_type: name }, raw: true })
        if (CheckDocumentTypeExist) {
            return res.status(400).send({ status: false, message: 'DocumentType Already Exists' })
        }
        let createObject: any = {
            name: name,
        }
        await DocumentType.create(createObject)
        return res.status(200).send({ status: true, message: 'DocumentType Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All DocumentType */
const getDocumentTypes = async (req: Request, res: Response) => {
    try {
        let getAllDocumentTypes: any = await DocumentType.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully DocumentType Fetched', data: getAllDocumentTypes })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get DocumentType by id */
const getDocumentTypeById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getDocumentType: any = await DocumentType.findOne({ where: { id: id }, raw: true })
        if (!getDocumentType) {
            return res.status(400).send({ status: false, message: 'DocumentType Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully DocumentType Fetched', data: getDocumentType })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update DocumentType By id */
const updateDocumentType = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name } = req.body
        let getDocumentType: any = await DocumentType.findOne({ where: { id: id }, raw: true })
        if (!getDocumentType) {
            return res.status(400).send({ status: false, message: 'DocumentType Not Found' })
        }
        await DocumentType.update({ document_type: name }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully DocumentType Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete DocumentType */
const deleteDocumentType = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getDocumentType: any = await DocumentType.findOne({ where: { id: id }, raw: true })
        if (!getDocumentType) {
            return res.status(400).send({ status: false, message: 'DocumentType Not Found' })
        }
        await DocumentType.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully DocumentType Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Create LocationList */
const addLocationList = async (req: Request, res: Response) => {
    try {
        let { name } = req.body

        let CheckLocationListExist: any = await LocationList.findOne({ where: { name: name }, raw: true })
        if (CheckLocationListExist) {
            return res.status(400).send({ status: false, message: 'LocationList Already Exists' })
        }
        let createObject: any = {
            name: name,
        }
        await LocationList.create(createObject)
        return res.status(200).send({ status: true, message: 'LocationList Added Successfully' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get All LocationList */
const getLocationLists = async (req: Request, res: Response) => {
    try {
        let getAllLocationLists: any = await LocationList.findAll({ raw: true })
        return res.status(200).send({ status: true, message: 'Successfully LocationList Fetched', data: getAllLocationLists })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Get LocationList by id */
const getLocationListById = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getLocationList: any = await LocationList.findOne({ where: { id: id }, raw: true })
        if (!getLocationList) {
            return res.status(400).send({ status: false, message: 'LocationList Not Found' })
        }
        return res.status(200).send({ status: true, message: 'Successfully LocationList Fetched', data: getLocationList })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** update LocationList By id */
const updateLocationList = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let { name } = req.body
        let getLocationList: any = await LocationList.findOne({ where: { id: id }, raw: true })
        if (!getLocationList) {
            return res.status(400).send({ status: false, message: 'LocationList Not Found' })
        }
        await LocationList.update({ name: name }, { where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully LocationList Updated', })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}

/** Delete LocationList */
const deleteLocationList = async (req: Request, res: Response) => {
    try {
        let { id } = req.params;
        let getLocationList: any = await LocationList.findOne({ where: { id: id }, raw: true })
        if (!getLocationList) {
            return res.status(400).send({ status: false, message: 'LocationList Not Found' })
        }
        await LocationList.destroy({ where: { id: id } })
        return res.status(200).send({ status: true, message: 'Successfully LocationList Deleted' })
    } catch (e) {
        console.log(e);
        return res.status(400).send({ status: false, message: e });
    }
}


export default {
    addLanguages, getLanguages, getLanguagesById, updateLanguage, deleteLanguage, addCategory, getCategories, getCategoriesById, updateCategory, deleteCategory, addNatureOfWork, getNatureOfWork, getNatureOfWorkById, updateNatureOfWork, deleteNatureOfWork,
    addReligion, getReligions, getReligionById, updateReligion, deleteReligion, addOccupation, getOccupationById, updateOccupation, deleteOccupation, getOccupations, addDocumentType, deleteDocumentType, getDocumentTypes, getDocumentTypeById, updateDocumentType,
    addLocationList, getLocationLists, getLocationListById, updateLocationList, deleteLocationList
}
