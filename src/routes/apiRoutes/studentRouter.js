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
import express from 'express';
import { uploadPayment } from '../../middlewares/multer.js';
const router = Router();

router.post('/register', uploadPayment.single('receipt'), registerStudentController);
router.get('/', checkAuth, getAllStudentsController);
router.get('/:id', checkAuth, getStudentByIdController);
router.delete('/:id', checkAuth, ensureIsOwnerOrAdmin, deleteStudentController);
router.put('/:id', checkAuth, ensureIsOwnerOrAdmin, modifyStudentController);
router.get('/payment', checkAuth, ensureIsOwnerOrAdmin, express.static('src/public/paymentReceipt'))

export default router;