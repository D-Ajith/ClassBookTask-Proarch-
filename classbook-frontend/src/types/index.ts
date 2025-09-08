export interface User {
  id: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface Class {
  id: string;
  name: string;
  description: string;
  sessions: Session[];
  createdAt: string;
  updatedAt: string;
}

export interface Session {
  id: string;
  classId: string;
  class: Class;
  date: string;
  capacity: number;
  bookings: Booking[];
  _count: {
    bookings: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  sessionId: string;
  session: {
    id: string;
    date: string;
    class: {
      id: string;
      name: string;
      description: string;
    };
    _count: {
      bookings: number;
    };
  };
  createdAt: string;
  updatedAt: string;
}
// Add this AuditLog interface
export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  user: {
    id: string;
    email: string;
  };
  sessionId?: string;
  session?: {
    id: string;
    class: {
      id: string;
      name: string;
    };
  };
  details?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: 'USER' | 'ADMIN'; // Add role to RegisterRequest
}
export interface AuthResponse {
  message: string;
  accessToken: string;
  refreshToken: string;
  user: User;
}