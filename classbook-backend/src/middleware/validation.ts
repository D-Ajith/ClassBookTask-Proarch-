import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.issues});
      }
      next(error);
    }
  };
};

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['USER', 'ADMIN']).optional(), // Add role to validation
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

export const createClassSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
});


export const createSessionSchema = z.object({
  classId: z.string().min(1, 'Class ID is required'),
  date: z.string().min(1, 'Date is required'),
  capacity: z.number().int().positive('Capacity must be positive'),
});
export const bookSessionSchema = z.object({
  sessionId: z.string().min(1, 'Session ID is required'),
});