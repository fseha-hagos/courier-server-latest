import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import { NextFunction, Request, Response } from 'express';
import { db } from '../utils/db';
import { Users as User } from '@prisma/client';


interface RequestWithUser extends Request {
  user: User;
}


export const test = (req: RequestWithUser, res: Response): void => {
  res.json({ message: 'API is working!' });
};


export const updateUser = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, 'Username must be between 7 and 20 characters')
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, 'Username can only contain letters and numbers')
      );
    }
  }

  try {
    const updatedUser = await db.user.update({
      where: { id: req.params.userId },
      data: {
        username: req.body.username,
        email: req.body.email,
        profilePicture: req.body.profilePicture,
        password: req.body.password,
      },
    });

    const { password, ...rest } = updatedUser;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await db.user.delete({
      where: { id: req.params.userId },
    });
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
};

export const signout = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res
      .clearCookie('access_token')
      .status(200)
      .json('User has been signed out');
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to see all users'));
  }

  try {
    const startIndex = parseInt(req.query.startIndex as string) || 0;
    const limit = parseInt(req.query.limit as string) || 9;
    const sortDirection = req.query.sort === 'asc' ? 'asc' : 'desc';

    const users = await db.user.findMany({
      skip: startIndex,
      take: limit,
      orderBy: { createdAt: sortDirection },
    });

    const totalUsers = await db.user.count();

    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await db.user.count({
      where: { createdAt: { gte: oneMonthAgo } },
    });

    const usersWithoutPassword = users.map(({ password, ...rest }) => rest);

    res.status(200).json({
      users: usersWithoutPassword,
      totalUsers,
      lastMonthUsers,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.params.userId },
    });

    if (!user) {
      return next(errorHandler(404, 'User not found'));
    }

    const { password, ...rest } = user;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
