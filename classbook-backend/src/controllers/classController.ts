import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../types';

export const createClass = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;

    const newClass = await prisma.class.create({
      data: {
        name,
        description,
      },
    });

    res.status(201).json(newClass);
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getClasses = async (req: AuthRequest, res: Response) => {
  try {
    const classes = await prisma.class.findMany({
      include: {
        sessions: {
          include: {
            bookings: true,
            _count: {
              select: { bookings: true },
            },
          },
        },
      },
    });

    res.json(classes);
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};