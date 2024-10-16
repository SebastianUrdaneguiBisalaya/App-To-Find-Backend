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
