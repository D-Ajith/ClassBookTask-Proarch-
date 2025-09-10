import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';

import authRoutes from './routes/auth';
import classRoutes from './routes/classes';
import sessionRoutes from './routes/sessions';
import bookingRoutes from './routes/bookings';
import adminRoutes from './routes/admin';

const app = express();

//  Security headers
app.use(helmet());

//  Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://class-book-task-proarch.vercel.app', // your Vercel frontend URL
];

//  CORS middleware with proper typing
app.use(
  cors({
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.error('CORS blocked:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

//  Logging
app.use(morgan('combined'));

//  JSON parsing
app.use(express.json());

//  Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});
app.use(limiter);

//  Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

//  Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

//  404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

//  Error handler
app.use(
  (err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('🔥 Server Error:', err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
);

export default app;
