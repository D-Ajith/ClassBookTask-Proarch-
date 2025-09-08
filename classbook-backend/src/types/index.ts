import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface AuthRequest extends Request {
  user?: JwtPayload | { id: string; email: string; role: string };
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CreateClassRequest {
  name: string;
  description: string;
}

export interface CreateSessionRequest {
  classId: string;
  date: string;
  capacity: number;
}

export interface BookSessionRequest {
  sessionId: string;
}