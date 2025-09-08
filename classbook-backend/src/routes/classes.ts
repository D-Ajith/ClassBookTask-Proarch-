import express from 'express';
import { createClass, getClasses } from '../controllers/classController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { createClassSchema } from '../middleware/validation';

const router = express.Router();

router.post('/', authenticateToken, requireAdmin, validateRequest(createClassSchema), createClass);
router.get('/', authenticateToken, getClasses);

export default router;