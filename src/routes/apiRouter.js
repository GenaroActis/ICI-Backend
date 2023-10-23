import { Router } from 'express';
import studentRouter from './apiRoutes/studentRouter.js';
const router = Router();

router.use('/student', studentRouter);

export default router;