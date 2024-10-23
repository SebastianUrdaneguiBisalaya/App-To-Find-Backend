import { InputSearch } from './../domain/events.entity';
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

export const getInputSearchTrendingEvents = (
  eventRepository: EventsRepository,
  data: InputSearch,
  limit: number,
  offset: number,
) => {
  try {
    return eventRepository.getInputSearchTrendingEvents(data, limit, offset);
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getInputSearchThisWeekEvents = (
  eventRepository: EventsRepository,
  data: InputSearch,
  limit: number,
  offset: number,
) => {
  try {
    return eventRepository.getInputSearchThisWeekEvents(data, limit, offset);
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getInputSearchUpcomingEvents = (
  eventRepository: EventsRepository,
  data: InputSearch,
  limit: number,
  offset: number,
) => {
  try {
    return eventRepository.getInputSearchUpcomingEvents(data, limit, offset);
  } catch (error) {
    throw new Error(`Unnable to get trending events by input search ${error}`);
  }
};

export const getEventDetailById = (
  eventRepository: EventsRepository,
  id: string
) => {
  try {
    return eventRepository.getEventDetailById(id)
  } catch (error) {
    throw new Error(`Unnable to get the event detail ${error}`)
  }
}