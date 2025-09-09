// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';

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


// import express from 'express';
// import cors from 'cors';
// import helmet from 'helmet';
// import morgan from 'morgan';
// import rateLimit from 'express-rate-limit';

// import authRoutes from './routes/auth';
// import classRoutes from './routes/classes';
// import sessionRoutes from './routes/sessions';
// import bookingRoutes from './routes/bookings';
// import adminRoutes from './routes/admin';

// const app = express();

// // Security headers
// app.use(helmet());

// // Allowed origins
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://class-book-task-proarch.vercel.app',
// ];

// // ✅ Use inferred type instead of `CorsOptions`
// const corsOptions: Parameters<typeof cors>[0] = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       console.error('CORS blocked:', origin);
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
// };

// app.use(cors(corsOptions));

// // Logging
// app.use(morgan('combined'));

// // JSON parsing
// app.use(express.json());

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 min
//   max: 100,
// });
// app.use(limiter);

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/classes', classRoutes);
// app.use('/api/sessions', sessionRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/admin', adminRoutes);

// // Health check
// app.get('/health', (req, res) => {
//   res.status(200).json({ message: 'Server is running' });
// });

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Error handler
// app.use(
//   (
//     err: unknown,
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {
//     console.error(err);
//     res.status(500).json({ error: 'Something went wrong!' });
//   }
// );

// export default app;


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

// Security headers
app.use(helmet());

// Allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://class-book-task-proarch.vercel.app',
];

// CORS
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

// Handle OPTIONS preflight
app.options('*', cors());

// Logging
app.use(morgan('combined'));

// JSON parsing
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100,
});
app.use(limiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use(
  (err: unknown, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('🔥 Server Error:', err);
    res.status(500).json({ error: 'Something went wrong!' });
  }
);

export default app;
