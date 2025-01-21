import { Router } from 'express';
import labourController from '../controller/labour.controller';
import labourValidator from '../validator/labour.validator';
import { uploadMulter } from '../helper/common';

const router: Router = Router();

/** add labour API */
router.post('/add-labour', labourValidator.addLabour(), labourController.addLabour);

/** Get All API */
router.get('/get-all', labourController.getAllLabour);

/** Get Labour by ID API */
router.get('/get/:id', labourController.getOne);

router.post("/upload-file", uploadMulter("user_profile").single("user_profile"), labourController.uploadFiles);

router.post("/upload-documents", uploadMulter("documents").array("user_documents"), labourController.uploadFiles);

export default router;