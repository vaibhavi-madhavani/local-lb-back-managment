import { Router } from 'express';
import roleController from '../controller/role.controller';


const router: Router = Router();

/** Get Roles API */
router.get('/get-roles', roleController.getAll);

export default router;