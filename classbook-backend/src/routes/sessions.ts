import express from 'express';
import { createSession, getSessions } from '../controllers/sessionController';
import { authenticateToken, requireAdmin } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { createSessionSchema } from '../middleware/validation';

const router = express.Router();

router.post('/', authenticateToken, requireAdmin, validateRequest(createSessionSchema), createSession);
router.get('/', authenticateToken, getSessions);

export default router;