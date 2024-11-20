import {
  TrendingEvents,
  ThisWeekEvents,
  UpcomingEvents,
  InputSearch,
  EventDetailById,
  UserHistoryEventsResponse,
  FavoriteEvents,
} from './events.entity';

export interface EventsRepository {
  getTrendingEvents(
    limit: number,
    offset: number,
    sort?: string,
    userId?: string,
  ): Promise<TrendingEvents[]>;
  getThisWeekEvents(
    limit: number,
    offset: number,
    sort?: string,
    userId?: string,
  ): Promise<ThisWeekEvents[]>;
  getUpcomingEvents(
    limit: number,
    offset: number,
    sort?: string,
    userId?: string,
  ): Promise<UpcomingEvents[]>;
  getInputSearchTrendingEvents(
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
    userId?: string,
  ): Promise<TrendingEvents[]>;
  getInputSearchThisWeekEvents(
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
    userId?: string,
  ): Promise<ThisWeekEvents[]>;
  getInputSearchUpcomingEvents(
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
    userId?: string,
  ): Promise<UpcomingEvents[]>;
  getEventDetailById(id: string): Promise<EventDetailById>;
  getUserHistoryEvents(
    userId: string,
  ): Promise<UserHistoryEventsResponse[] | null>;
  getMyFavoriteEvents(userId: string): Promise<ThisWeekEvents[]>;
  toggleEventToFavorite(
    userId: string,
    eventId: string,
  ): Promise<FavoriteEvents>;
}
