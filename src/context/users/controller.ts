import { Request, Response } from 'express';
import { projectPrismaRepository } from './infrastructure';
import * as userService from './application';

const userRepository = projectPrismaRepository;

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userRepository, userId);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `Unable to get user ${error}` });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { user_name, user_lastname } = req.body;
    const updatedUser = await userService.updateUser(userRepository, userId, {
      user_name,
      user_lastname,
    });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: `Unable to update user ${error}` });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    await userService.deleteUser(userRepository, userId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: `Unable to delete user: ${error}` });
  }
};
