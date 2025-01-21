import { Router } from 'express';
import genericController from '../controller/generic.controller';
const router: Router = Router();

/** Add Languages */
router.post('/add-languages', genericController.addLanguages);

/** Get All Languages */
router.get('/get-languages', genericController.getLanguages);

/** Get Languages by id */
router.get('/get-languages/:id', genericController.getLanguagesById);

/** Update Languages By id */
router.put('/update-languages/:id', genericController.updateLanguage);

/** Delete Languages By id */
router.delete('/delete-languages/:id', genericController.deleteLanguage);

/** Add Category */
router.post('/add-category', genericController.addCategory);

/** Get All Category */
router.get('/get-categories', genericController.getCategories);

/** Get Category by id */
router.get('/get-categories/:id', genericController.getCategoriesById);

/** Update Category By id */
router.put('/update-categories/:id', genericController.updateCategory);

/** Delete Category By id */
router.delete('/delete-categories/:id', genericController.deleteCategory);

/** Add Nature of work */
router.post('/add-nature-of-work', genericController.addNatureOfWork);

/** Get All Nature of work */
router.get('/get-nature-of-work', genericController.getNatureOfWork);

/** Get Nature of work by id */
router.get('/get-nature-of-work/:id', genericController.getNatureOfWorkById);

/** Update Nature of work By id */
router.put('/update-nature-of-work/:id', genericController.updateNatureOfWork);

/** Delete Nature of work By id */
router.delete('/delete-nature-of-work/:id', genericController.deleteNatureOfWork);

/** Add religion */
router.post('/add-religion', genericController.addReligion);

/** Get All religion */
router.get('/get-religions', genericController.getReligions);

/** Get religion by id */
router.get('/get-religions/:id', genericController.getReligionById);

/** Update religion By id */
router.put('/update-religion/:id', genericController.updateReligion);

/** Delete religion By id */
router.delete('/delete-religion/:id', genericController.deleteReligion);

/** Add Occupation */
router.post('/add-occupation', genericController.addOccupation);

/** Get All Occupation */
router.get('/get-occupations', genericController.getOccupations);

/** Get Occupation by id */
router.get('/get-occupations/:id', genericController.getOccupationById);

/** Update Occupation By id */
router.put('/update-occupation/:id', genericController.updateOccupation);

/** Delete Occupation By id */
router.delete('/delete-occupation/:id', genericController.deleteOccupation);

/** Add Document Type */
router.post('/add-document-type', genericController.addDocumentType);

/** Get All Document Type */
router.get('/get-document-types', genericController.getDocumentTypes);

/** Get Document Type by id */
router.get('/get-document-types/:id', genericController.getDocumentTypeById);

/** Update Document Type By id */
router.put('/update-document-type/:id', genericController.updateDocumentType);

/** Delete Document Type By id */
router.delete('/delete-document-type/:id', genericController.deleteDocumentType);

/** Add Location List */
router.post('/add-location-list', genericController.addLocationList);

/** Get All Location List */
router.get('/get-location-lists', genericController.getLocationLists);

/** Get Location List by id */
router.get('/get-location-lists/:id', genericController.getLocationListById);

/** Update Location List By id */
router.put('/update-location-list/:id', genericController.updateLocationList);

/** Delete Location List By id */
router.delete('/delete-location-list/:id', genericController.deleteLocationList);


export default router;