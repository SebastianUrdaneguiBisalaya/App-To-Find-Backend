import { Request, Response } from 'express';
import { projectPrismaRepository } from './infrastructure';
import * as eventService from './application';

const repository = projectPrismaRepository;

export const getTrendingEvents = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const trendingEvents = await eventService.getTrendingEvents(
      repository,
      limit,
      offset,
    );
    res.json(trendingEvents);
  } catch (error) {
    throw new Error(`Unable to get trending events ${error}`);
  }
};

export const getThisWeekEvents = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const thisWeekEvents = await eventService.getThisWeekEvents(
      repository,
      limit,
      offset,
    );
    res.json(thisWeekEvents);
  } catch (error) {
    throw new Error(`Unable to get this week events ${error}`);
  }
};

export const getUpcomingEvents = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const upcommingEvents = await eventService.getUpcomingEvents(
      repository,
      limit,
      offset,
    );
    res.json(upcommingEvents);
  } catch (error) {
    throw new Error(`Unable to get upcoming events ${error}`);
  }
};
