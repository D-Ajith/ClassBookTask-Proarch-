"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshToken = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const jwt_1 = require("../utils/jwt");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const register = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        // Check if user already exists
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        // Create user with the specified role
        const user = await prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                role: role || 'USER',
            },
        });
        // Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ id: user.id });
        res.status(201).json({
            message: 'User created successfully',
            accessToken,
            refreshToken,
            user: { id: user.id, email: user.email, role: user.role },
        });
    }
    catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find user
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Check password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }
        // Generate tokens
        const accessToken = (0, jwt_1.generateAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role
        });
        const refreshToken = (0, jwt_1.generateRefreshToken)({ id: user.id });
        res.json({
            message: 'Login successful',
            accessToken,
            refreshToken,
            user: { id: user.id, email: user.email, role: user.role },
        });
    }
    catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.login = login;
const refreshToken = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            return res.status(400).json({ error: 'Refresh token is required' });
        }
        if (!process.env.JWT_REFRESH_SECRET) {
            return res.status(500).json({ error: 'Server configuration error' });
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const user = await prisma_1.default.user.findUnique({
            where: { id: decoded.id },
            select: { id: true, email: true, role: true },
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const newAccessToken = (0, jwt_1.generateAccessToken)({
            id: user.id,
            email: user.email,
            role: user.role
        });
        res.json({
            accessToken: newAccessToken,
        });
    }
    catch (error) {
        console.error('Token refresh error:', error);
        res.status(403).json({ error: 'Invalid refresh token' });
    }
};
exports.refreshToken = refreshToken;
