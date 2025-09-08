import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../types';

export const createSession = async (req: AuthRequest, res: Response) => {
  try {
    const { classId, date, capacity } = req.body;

    const session = await prisma.session.create({
      data: {
        classId,
        date: new Date(date), // Convert to Date object here
        capacity,
      },
    });

    res.status(201).json(session);
  } catch (error) {
    console.error('Create session error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
export const getSessions = async (req: AuthRequest, res: Response) => {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        date: {
          gte: new Date(), // Only future sessions
        },
      },
      include: {
        class: true,
        bookings: true,
        _count: {
          select: { bookings: true },
        },
      },
      orderBy: {
        date: 'asc',
      },
    });

    res.json(sessions);
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};