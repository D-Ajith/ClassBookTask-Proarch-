"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBookings = exports.cancelBooking = exports.bookSession = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const bookSession = async (req, res) => {
    try {
        const { sessionId } = req.body;
        const userId = req.user.id;
        // Check if session exists
        const session = await prisma_1.default.session.findUnique({
            where: { id: sessionId },
            include: {
                bookings: true,
                _count: {
                    select: { bookings: true },
                },
            },
        });
        if (!session) {
            return res.status(404).json({ error: 'Session not found' });
        }
        // Check if session is in the future
        if (new Date(session.date) < new Date()) {
            return res.status(400).json({ error: 'Cannot book past sessions' });
        }
        // Check if user already booked this session
        const existingBooking = await prisma_1.default.booking.findFirst({
            where: {
                userId,
                sessionId,
            },
        });
        if (existingBooking) {
            return res.status(400).json({ error: 'Already booked this session' });
        }
        // Check if session is at capacity
        if (session._count.bookings >= session.capacity) {
            return res.status(400).json({ error: 'Session is fully booked' });
        }
        // Create booking and audit log in a transaction
        const [booking] = await prisma_1.default.$transaction([
            prisma_1.default.booking.create({
                data: {
                    userId,
                    sessionId,
                },
            }),
            prisma_1.default.auditLog.create({
                data: {
                    action: 'BOOK',
                    userId,
                    sessionId,
                    details: `Booked session ${sessionId}`,
                },
            }),
        ]);
        res.status(201).json(booking);
    }
    catch (error) {
        console.error('Book session error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.bookSession = bookSession;
const cancelBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const userId = req.user.id;
        // Find the booking
        const booking = await prisma_1.default.booking.findUnique({
            where: { id: bookingId },
            include: {
                session: true,
            },
        });
        if (!booking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        // Check if the user owns the booking
        if (booking.userId !== userId) {
            return res.status(403).json({ error: 'Not authorized to cancel this booking' });
        }
        // Check if session is in the future
        if (new Date(booking.session.date) < new Date()) {
            return res.status(400).json({ error: 'Cannot cancel past sessions' });
        }
        // Delete booking and create audit log in a transaction
        await prisma_1.default.$transaction([
            prisma_1.default.booking.delete({
                where: { id: bookingId },
            }),
            prisma_1.default.auditLog.create({
                data: {
                    action: 'CANCEL',
                    userId,
                    sessionId: booking.sessionId,
                    details: `Cancelled booking ${bookingId} for session ${booking.sessionId}`,
                },
            }),
        ]);
        res.json({ message: 'Booking cancelled successfully' });
    }
    catch (error) {
        console.error('Cancel booking error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.cancelBooking = cancelBooking;
const getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await prisma_1.default.booking.findMany({
            where: { userId },
            include: {
                session: {
                    include: {
                        class: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        res.json(bookings);
    }
    catch (error) {
        console.error('Get user bookings error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getUserBookings = getUserBookings;
