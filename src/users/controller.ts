import { Request, Response } from 'express';
import { projectPrismaRepository } from './infrastructure'; 
import * as userService from './application'; 

const userRepository = projectPrismaRepository; 

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; 
    const user = await userService.getUserById(userRepository, userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: `Unable to get user ${error}` });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id; 
    const userUpdates = req.body; 
    const updatedUser = await userService.updateUser(userRepository, userId, userUpdates);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: `Unable to update user ${error}` });
  }
};