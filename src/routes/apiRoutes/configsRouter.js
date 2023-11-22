import { Router } from 'express';
import { createConfigController, getConfigController, updateConfigController } from '../../controllers/configsController.js';
import { checkAuth } from '../../jwt/auth.js';
import { ensureIsOwner } from '../../middlewares/ensureIsOwner.js';
const router = Router();

router.get('/', getConfigController);
router.post('/', checkAuth, ensureIsOwner, createConfigController);
router.put('/', checkAuth, ensureIsOwner, updateConfigController);