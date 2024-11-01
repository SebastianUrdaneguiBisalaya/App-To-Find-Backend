import {
  TrendingEvents,
  ThisWeekEvents,
  UpcomingEvents,
  InputSearch,
  EventDetailById,
  UserHistoryEventsResponse,
} from './events.entity';

export interface EventsRepository {
  getTrendingEvents(
    limit: number,
    offset: number,
    sort?: string,
  ): Promise<TrendingEvents[]>;
  getThisWeekEvents(
    limit: number,
    offset: number,
    sort?: string,
  ): Promise<ThisWeekEvents[]>;
  getUpcomingEvents(
    limit: number,
    offset: number,
    sort?: string,
  ): Promise<UpcomingEvents[]>;
  getInputSearchTrendingEvents(
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
  ): Promise<TrendingEvents[]>;
  getInputSearchThisWeekEvents(
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
  ): Promise<ThisWeekEvents[]>;
  getInputSearchUpcomingEvents(
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
  ): Promise<UpcomingEvents[]>;
  getEventDetailById(id: string): Promise<EventDetailById>;
  getUserHistoryEvents(
    userId: string,
  ): Promise<UserHistoryEventsResponse[] | null>;
}
