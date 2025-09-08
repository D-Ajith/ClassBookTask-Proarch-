import express from 'express';
import { register, login, refreshToken } from '../controllers/authController';
import { validateRequest } from '../middleware/validation';
import { registerSchema, loginSchema } from '../middleware/validation';

const router = express.Router();

router.post('/register', validateRequest(registerSchema), register);
router.post('/login', validateRequest(loginSchema), login);
router.post('/refresh-token', refreshToken);

export default router;