import { EventsRepository } from '../domain/events.repository';

export const getTrendingEvents = (eventRepository: EventsRepository) => {
  try {
    return eventRepository.getTrendingEvents();
  } catch (error) {
    throw new Error(`Unnable to get trending events ${error}`);
  }
};

export const getThisWeekEvents = (eventRespository: EventsRepository) => {
  try {
    return eventRespository.getThisWeekEvents();
  } catch (error) {
    throw new Error(`Unnable to get this week events ${error}`);
  }
};

export const getUpcomingEvents = (eventRepository: EventsRepository) => {
  try {
    return eventRepository.getUpcomingEvents();
  } catch (error) {
    throw new Error(`Unnable to get upcoming events ${error}`);
  }
};
