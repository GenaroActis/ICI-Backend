import { Router } from 'express';
import { 
    registerStudentController,
    getAllStudentsController,
    getStudentByIdController,
    deleteStudentController,
    modifyStudentController
} from '../../controllers/studentController.js';
import { checkAuth } from '../../jwt/auth.js';
const router = Router();

router.post('/register', registerStudentController);
router.get('/', getAllStudentsController);
router.get('/:id', getStudentByIdController);
router.delete('/:id', checkAuth, deleteStudentController);
router.put('/:id', checkAuth, modifyStudentController);

export default router;