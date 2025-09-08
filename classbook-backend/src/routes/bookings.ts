import express from 'express';
import { bookSession, cancelBooking, getUserBookings } from '../controllers/bookingController';
import { authenticateToken } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { bookSessionSchema } from '../middleware/validation';

const router = express.Router();

router.post('/', authenticateToken, validateRequest(bookSessionSchema), bookSession);
router.delete('/:bookingId', authenticateToken, cancelBooking);
router.get('/my-bookings', authenticateToken, getUserBookings);

export default router;