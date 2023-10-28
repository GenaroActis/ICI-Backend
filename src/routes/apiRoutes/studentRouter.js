import { Router } from 'express';
import { 
    registerStudentController,
    getAllStudentsController,
    getStudentByIdController,
    deleteStudentController,
    modifyStudentController
} from '../../controllers/studentController.js';
import { ensureIsOwnerOrAdmin } from '../../middlewares/ensureIsOwnerOrAdmin.js'
import { checkAuth } from '../../jwt/auth.js';
const router = Router();

router.post('/register', registerStudentController);
router.get('/', checkAuth, getAllStudentsController);
router.get('/:id', checkAuth, getStudentByIdController);
router.delete('/:id', checkAuth, ensureIsOwnerOrAdmin, deleteStudentController);
router.put('/:id', checkAuth, ensureIsOwnerOrAdmin, modifyStudentController);

export default router;