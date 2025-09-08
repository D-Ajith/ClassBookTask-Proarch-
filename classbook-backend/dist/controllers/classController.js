"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClasses = exports.createClass = void 0;
const prisma_1 = __importDefault(require("../utils/prisma"));
const createClass = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newClass = await prisma_1.default.class.create({
            data: {
                name,
                description,
            },
        });
        res.status(201).json(newClass);
    }
    catch (error) {
        console.error('Create class error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.createClass = createClass;
const getClasses = async (req, res) => {
    try {
        const classes = await prisma_1.default.class.findMany({
            include: {
                sessions: {
                    include: {
                        bookings: true,
                        _count: {
                            select: { bookings: true },
                        },
                    },
                },
            },
        });
        res.json(classes);
    }
    catch (error) {
        console.error('Get classes error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.getClasses = getClasses;
