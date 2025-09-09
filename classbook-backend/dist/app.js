"use strict";
// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import authRoutes from './routes/auth';
// import classRoutes from './routes/classes';
// import sessionRoutes from './routes/sessions';
// import bookingRoutes from './routes/bookings';
// import adminRoutes from './routes/admin';
// const app = express();
// // Middleware
// app.use(helmet());
// const allowedOrigins = [
//   'http://localhost:5173', 
//   'https://class-book-task-proarch.vercel.app/'
// ];
// app.use(cors({
//   origin: function(origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));
// app.use(morgan('combined'));
// app.use(express.json());
// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
// });
// app.use(limiter);
// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/classes', classRoutes);
// app.use('/api/sessions', sessionRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/admin', adminRoutes);
// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.status(200).json({ message: 'Server is running' });
// });
// // 404 handler - FIXED: Removed the '*' pattern
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });
// // Error handler
// app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const auth_1 = __importDefault(require("./routes/auth"));
const classes_1 = __importDefault(require("./routes/classes"));
const sessions_1 = __importDefault(require("./routes/sessions"));
const bookings_1 = __importDefault(require("./routes/bookings"));
const admin_1 = __importDefault(require("./routes/admin"));
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
// CORS: allow localhost and Vercel frontend
const allowedOrigins = [
    'http://localhost:5173',
    'https://class-book-task-proarch.vercel.app'
];
app.use((0, cors_1.default)({
    origin: function (origin, callback) {
        // allow requests with no origin (like Postman or server-to-server)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            console.error('CORS blocked:', origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Logging
app.use((0, morgan_1.default)('combined'));
// Parse JSON
app.use(express_1.default.json());
// Rate limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per window
});
app.use(limiter);
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/classes', classes_1.default);
app.use('/api/sessions', sessions_1.default);
app.use('/api/bookings', bookings_1.default);
app.use('/api/admin', admin_1.default);
// Health check
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is running' });
});
// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
exports.default = app;
