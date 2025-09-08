import express from 'express';
import { getAuditLogs, getAllBookings } from '../controllers/adminController';
import { authenticateToken, requireAdmin } from '../middleware/auth';

const router = express.Router();

router.get('/audit-logs', authenticateToken, requireAdmin, getAuditLogs);
router.get('/bookings', authenticateToken, requireAdmin, getAllBookings);

export default router;