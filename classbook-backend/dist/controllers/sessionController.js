"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSessions = exports.createSession = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createSession = async (req, res) => {
    try {
        const { classId, date, capacity } = req.body;
        const session = await prisma_1.default.session.create({
            data: {
                classId,
                date: new Date(date), // Convert to Date object here
                capacity,
            },
        });
        res.status(201).json(session);
    }
    catch (error) {
        console.error('Create session error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createSession = createSession;
const getSessions = async (req, res) => {
    try {
        const sessions = await prisma_1.default.session.findMany({
            where: {
                date: {
                    gte: new Date(), // Only future sessions
                },
            },
            include: {
                class: true,
                bookings: true,
                _count: {
                    select: { bookings: true },
                },
            },
            orderBy: {
                date: 'asc',
            },
        });
        res.json(sessions);
    }
    catch (error) {
        console.error('Get sessions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getSessions = getSessions;
