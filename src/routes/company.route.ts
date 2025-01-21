import { Router } from 'express';
import companyController from '../controller/company.controller';
const router: Router = Router();

/** Add Super Admin API */
router.post('/add-super-admin', companyController.addSuperAdmin);

/** Get Super Admin API */
router.get('/get-super-admin/:id', companyController.getSuperAdminById);

/** Update Super Admin API */
router.put('/update-super-admin/:id', companyController.updateSuperAdminById);

/** Delete Super Admin API */
router.delete('/delete-super-admin/:id', companyController.deleteSuperAdmin);

/** Get All Super Admin By company Id API */
router.get('/get-all-super-admins/:companyId', companyController.getAllCompaniesSuperAdmin);

/** Add Main Company API */
router.post('/add-main-company', companyController.addMainCompanies);

/** Get Main Company API */
router.get('/get-main-company/:id', companyController.getMainCompaniesById);

/** Update Main Company API */
router.put('/update-main-company/:id', companyController.updateMainCompany);

/** Delete Main Company API */
router.delete('/delete-main-company/:id', companyController.deleteMainCompany);

/** Get All Main Companies API */
router.get('/get-all-main-companies', companyController.getMainCompanies);

/** Add Companies */
router.post('/add-companies', companyController.addCompanies);

/** Get Companies */
router.get('/get-companies/:id', companyController.getCompaniesById);

/** Update Companies */
router.put('/update-companies/:id', companyController.updateCompany);

/** Delete Companies */
router.delete('/delete-companies/:id', companyController.deleteCompanies);

/** Get All Companies */
router.get('/get-all-companies', companyController.getAllCompanies);

export default router;