import { Router } from 'express';
import studentRouter from './apiRoutes/studentRouter.js';
import userRouter from './apiRoutes/userRouter.js';
import emailRouter from './apiRoutes/emailRouter.js'
const router = Router();

router.use('/student', studentRouter);
router.use('/user', userRouter);
router.use('/email', emailRouter)

export default router;