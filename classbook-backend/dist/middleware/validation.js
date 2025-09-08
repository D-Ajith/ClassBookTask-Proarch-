"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookSessionSchema = exports.createSessionSchema = exports.createClassSchema = exports.loginSchema = exports.registerSchema = exports.validateRequest = void 0;
const zod_1 = require("zod");
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (error) {
            if (error instanceof zod_1.z.ZodError) {
                return res.status(400).json({ error: error.issues });
            }
            next(error);
        }
    };
};
exports.validateRequest = validateRequest;
exports.registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
    role: zod_1.z.enum(['USER', 'ADMIN']).optional(), // Add role to validation
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.createClassSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Name is required'),
    description: zod_1.z.string().min(1, 'Description is required'),
});
exports.createSessionSchema = zod_1.z.object({
    classId: zod_1.z.string().min(1, 'Class ID is required'),
    date: zod_1.z.string().min(1, 'Date is required'),
    capacity: zod_1.z.number().int().positive('Capacity must be positive'),
});
exports.bookSessionSchema = zod_1.z.object({
    sessionId: zod_1.z.string().min(1, 'Session ID is required'),
});
