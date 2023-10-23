import { Router } from 'express';
import { 
    registerUserController,
    loginUserController
} from '../../controllers/userController.js';
const router = Router();

router.post('/register', registerUserController);
router.put('/login', loginUserController);

export default router;