import { Request, Response } from 'express';
import { projectPrismaRepository } from './infrastructure';
import * as eventService from './application';

const repository = projectPrismaRepository;

export const getTrendingEvents = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const sort = (req.query.sort as string) || '';
    const userId = req.query.user_id as string;
    const trendingEvents = await eventService.getTrendingEvents(
      repository,
      limit,
      offset,
      sort,
      userId,
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
    const userId = req.query.user_id as string;
    const thisWeekEvents = await eventService.getThisWeekEvents(
      repository,
      limit,
      offset,
      userId,
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
    const userId = req.query.user_id as string;
    const upcommingEvents = await eventService.getUpcomingEvents(
      repository,
      limit,
      offset,
      userId,
    );
    res.json(upcommingEvents);
  } catch (error) {
    throw new Error(`Unable to get upcoming events ${error}`);
  }
};

export const getInputSearchTrendingEvents = async (
  req: Request,
  res: Response,
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const userId = req.query.user_id as string;
    const event_date_start = req.query.event_date_start
      ? new Date(req.query.event_date_start as string)
      : undefined;
    const event_date_end = req.query.event_date_end
      ? new Date(req.query.event_date_end as string)
      : undefined;
    const event_name = req.query.event_name as string;
    const trendingEventsByInputSearch =
      await eventService.getInputSearchTrendingEvents(
        repository,
        { event_date_start, event_date_end, event_name },
        limit,
        offset,
        userId,
      );
    res.json(trendingEventsByInputSearch);
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getInputSearchThisWeekEvents = async (
  req: Request,
  res: Response,
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const userId = req.query.user_id as string;
    const event_date_start = req.query.event_date_start
      ? new Date(req.query.event_date_start as string)
      : undefined;
    const event_date_end = req.query.event_date_end
      ? new Date(req.query.event_date_end as string)
      : undefined;
    const event_name = req.query.event_name as string;
    const thisWeekEventsByInputSearch =
      await eventService.getInputSearchThisWeekEvents(
        repository,
        { event_date_start, event_date_end, event_name },
        limit,
        offset,
        userId,
      );
    res.json(thisWeekEventsByInputSearch);
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getInputSearchUpcomingEvents = async (
  req: Request,
  res: Response,
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
    const userId = req.query.user_id as string;
    const event_date_start = req.query.event_date_start
      ? new Date(req.query.event_date_start as string)
      : undefined;
    const event_date_end = req.query.event_date_end
      ? new Date(req.query.event_date_end as string)
      : undefined;
    const event_name = req.query.event_name as string;
    const upcomingEventsByInputSearch =
      await eventService.getInputSearchUpcomingEvents(
        repository,
        { event_date_start, event_date_end, event_name },
        limit,
        offset,
        userId,
      );
    res.json(upcomingEventsByInputSearch);
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getUserHistoryEvents = async (req: Request, res: Response) => {
  const userId = req.params.user_id as string;
  try {
    const userHistoryEvents = await eventService.getUserHistoryEvents(
      repository,
      userId,
    );
    res.json(userHistoryEvents);
  } catch (error) {
    throw new Error(`Unnable to get user history events ${error}`);
  }
};

export const getMyFavoriteEvents = async (req: Request, res: Response) => {
  const userId = req.params.user_id as string;
  try {
    const myFavoriteEvents = await eventService.getMyFavoriteEvents(
      repository,
      userId,
    );
    res.json(myFavoriteEvents);
  } catch (error) {
    throw new Error(`Unnable to get my favorite events ${error}.`);
  }
};

export const addEventToFavorite = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body as { userId: string; eventId: string };
  try {
    await eventService.addEventToFavorite(repository, userId, eventId);
    res.json({ message: 'Ok' });
  } catch (error) {
    throw new Error(`Unnable to get my favorite events ${error}.`);
  }
};

export const updateEventToFavorite = async (req: Request, res: Response) => {
  const { userId, eventId } = req.body as { userId: string; eventId: string };
  try {
    await eventService.updateEventToFavorite(repository, userId, eventId);
    res.json({ message: 'Ok' });
  } catch (error) {
    throw new Error(`Unnable to get my favorite events ${error}.`);
  }
};

export const getEventDetailById = async (req: Request, res: Response) => {
  const event_id = req.params.event_id as string;
  try {
    const detailEventById = await eventService.getEventDetailById(
      repository,
      event_id,
    );
    res.json(detailEventById);
  } catch (error) {
    throw new Error(`Unnable to get the event detail by id. ${error}`);
  }
};
