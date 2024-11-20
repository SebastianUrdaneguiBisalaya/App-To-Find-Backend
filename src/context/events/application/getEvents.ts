import { InputSearch } from './../domain/events.entity';
import { EventsRepository } from '../domain/events.repository';

export const getTrendingEvents = (
  eventRepository: EventsRepository,
  limit: number,
  offset: number,
  sort?: string,
  userId?: string,
) => {
  try {
    return eventRepository.getTrendingEvents(limit, offset, sort, userId);
  } catch (error) {
    throw new Error(`Unnable to get trending events ${error}`);
  }
};

export const getThisWeekEvents = (
  eventRespository: EventsRepository,
  limit: number,
  offset: number,
  sort?: string,
  userId?: string,
) => {
  try {
    return eventRespository.getThisWeekEvents(limit, offset, sort, userId);
  } catch (error) {
    throw new Error(`Unnable to get this week events ${error}`);
  }
};

export const getUpcomingEvents = (
  eventRepository: EventsRepository,
  limit: number,
  offset: number,
  sort?: string,
  userId?: string,
) => {
  try {
    return eventRepository.getUpcomingEvents(limit, offset, sort, userId);
  } catch (error) {
    throw new Error(`Unnable to get upcoming events ${error}`);
  }
};

export const getInputSearchTrendingEvents = (
  eventRepository: EventsRepository,
  data: InputSearch,
  limit: number,
  offset: number,
  sort?: string,
  userId?: string,
) => {
  try {
    return eventRepository.getInputSearchTrendingEvents(
      data,
      limit,
      offset,
      sort,
      userId,
    );
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getInputSearchThisWeekEvents = (
  eventRepository: EventsRepository,
  data: InputSearch,
  limit: number,
  offset: number,
  sort?: string,
  userId?: string,
) => {
  try {
    return eventRepository.getInputSearchThisWeekEvents(
      data,
      limit,
      offset,
      sort,
      userId,
    );
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getInputSearchUpcomingEvents = (
  eventRepository: EventsRepository,
  data: InputSearch,
  limit: number,
  offset: number,
  sort?: string,
  userId?: string,
) => {
  try {
    return eventRepository.getInputSearchUpcomingEvents(
      data,
      limit,
      offset,
      sort,
      userId,
    );
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getEventDetailById = (
  eventRepository: EventsRepository,
  id: string,
) => {
  try {
    return eventRepository.getEventDetailById(id);
  } catch (error) {
    throw new Error(`Unnable to get the event detail ${error}`);
  }
};

export const getUserHistoryEvents = (
  eventRepository: EventsRepository,
  userId: string,
) => {
  try {
    return eventRepository.getUserHistoryEvents(userId);
  } catch (error) {
    throw new Error(`Unnable to get user history events ${error}`);
  }
};

export const getMyFavoriteEvents = (
  eventRepository: EventsRepository,
  userId: string,
) => {
  try {
    return eventRepository.getMyFavoriteEvents(userId);
  } catch (error) {
    throw new Error(`Unnable to get my favorite events ${error}`);
  }
};

export const toggleEventToFavorite = (
  eventRepository: EventsRepository,
  userId: string,
  eventId: string,
) => {
  try {
    return eventRepository.toggleEventToFavorite(userId, eventId);
  } catch (error) {
    throw new Error(`Unnable to add the event in favorite events ${error}`);
  }
};
