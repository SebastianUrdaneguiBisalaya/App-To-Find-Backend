import { EventsRepository } from '../domain/events.repository';

export const getTrendingEvents = (
  eventRepository: EventsRepository,
  limit: number,
  offset: number,
) => {
  try {
    return eventRepository.getTrendingEvents(limit, offset);
  } catch (error) {
    throw new Error(`Unnable to get trending events ${error}`);
  }
};

export const getThisWeekEvents = (
  eventRespository: EventsRepository,
  limit: number,
  offset: number,
) => {
  try {
    return eventRespository.getThisWeekEvents(limit, offset);
  } catch (error) {
    throw new Error(`Unnable to get this week events ${error}`);
  }
};

export const getUpcomingEvents = (
  eventRepository: EventsRepository,
  limit: number,
  offset: number,
) => {
  try {
    return eventRepository.getUpcomingEvents(limit, offset);
  } catch (error) {
    throw new Error(`Unnable to get upcoming events ${error}`);
  }
};
