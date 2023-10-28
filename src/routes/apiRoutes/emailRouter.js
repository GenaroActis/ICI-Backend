import { Router } from 'express';
import { checkAuth } from '../../jwt/auth.js';
import { teacherRegistrationEmailController, sendRecoverPasswordEmailController } from '../../controllers/emailController.js';
import { ensureIsOwner } from '../../middlewares/ensureIsOwner.js';
const router = Router();

router.post('/teacher/registration', checkAuth, ensureIsOwner, teacherRegistrationEmailController);
router.post('/recover', sendRecoverPasswordEmailController)


export default router