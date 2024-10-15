import { Request, Response } from 'express';
import { projectPrismaRepository } from './infrastructure';
import * as eventService from './application';

const repository = projectPrismaRepository;

export const getTrendingEvents = async (req: Request, res: Response) => {
  try {
    const trendingEvents = await eventService.getTrendingEvents(repository);
    res.json(trendingEvents);
  } catch (error) {
    throw new Error(`Unable to get trending events ${error}`);
  }
};
