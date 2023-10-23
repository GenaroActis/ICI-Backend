import { Router } from 'express';
import studentRouter from './apiRoutes/studentRouter.js';
import userRouter from './apiRoutes/userRouter.js'
const router = Router();

router.use('/student', studentRouter);
router.use('/user', userRouter);

export default router;