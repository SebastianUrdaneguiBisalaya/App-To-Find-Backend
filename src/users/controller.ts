import { Request, Response } from 'express';
import { projectPrismaRepository } from './infrastructure';
import * as eventService from './application';

const repository = projectPrismaRepository;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const getUsers = await eventService.getUsers(
      repository
    );
    res.json(getUsers);
  } catch (error) {
    throw new Error(`Unable to get users ${error}`);
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const user = await eventService.getUserById(repository, user_id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Unable to get user by ID: ${error}` });
  }
};