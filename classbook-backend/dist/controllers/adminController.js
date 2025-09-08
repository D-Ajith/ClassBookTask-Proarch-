"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBookings = exports.getAuditLogs = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const getAuditLogs = async (req, res) => {
    try {
        const logs = await prisma_1.default.auditLog.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
                session: {
                    include: {
                        class: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 100, // Limit to 100 most recent logs
        });
        res.json(logs);
    }
    catch (error) {
        console.error('Get audit logs error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAuditLogs = getAuditLogs;
const getAllBookings = async (req, res) => {
    try {
        const bookings = await prisma_1.default.booking.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                    },
                },
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
        console.error('Get all bookings error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getAllBookings = getAllBookings;
