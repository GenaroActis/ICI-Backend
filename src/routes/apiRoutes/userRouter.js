import { Router } from 'express';
import { 
    registerUserController,
    loginUserController,
    recoverPasswordController,
    getTokenController,
    deleteUserController,
    getUsersController,
    changeRoleUserController
} from '../../controllers/userController.js';
import { ensureIsOwner } from '../../middlewares/ensureIsOwner.js'
import { checkAuth, checkAuthRegisterTeacher, checkAuthToRecoverPass } from '../../jwt/auth.js';
const router = Router();

router.post('/register', getTokenController, checkAuthRegisterTeacher, registerUserController);
router.put('/login', loginUserController);
router.put('/recover', getTokenController, checkAuthToRecoverPass, recoverPasswordController);
router.delete('/:userId', checkAuth, ensureIsOwner, deleteUserController);
router.get('/all', checkAuth, ensureIsOwner, getUsersController);
router.put('/role/:userId', checkAuth, ensureIsOwner, changeRoleUserController);

export default router;