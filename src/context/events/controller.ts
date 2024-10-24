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

export const getInputSearchTrendingEvents = async (
  req: Request,
  res: Response,
) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const offset = parseInt(req.query.offset as string) || 0;
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
      );
    res.json(upcomingEventsByInputSearch);
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
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
