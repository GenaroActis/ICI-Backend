import { Router } from 'express';
import { 
    registerStudentController,
    getAllStudentsController,
    getStudentByIdController,
    deleteStudentController,
    modifyStudentController
} from '../../controllers/studentController.js';
const router = Router();

router.post('/register', registerStudentController);
router.get('/', getAllStudentsController);
router.get('/:id', getStudentByIdController);
router.delete('/:id', deleteStudentController);
router.put('/:id', modifyStudentController);

export default router;