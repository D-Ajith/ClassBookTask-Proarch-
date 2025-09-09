// import { Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import { AuthRequest } from '../types';

// export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) {
//     return res.status(401).json({ error: 'Access token required' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.status(403).json({ error: 'Invalid or expired token' });
//   }
// };

// export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
//   if (req.user?.role !== 'ADMIN') {
//     return res.status(403).json({ error: 'Admin access required' });
//   }
//   next();
// };




import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthRequest } from '../types';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as any;
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};