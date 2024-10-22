import {
  TrendingEvents,
  ThisWeekEvents,
  UpcomingEvents,
  InputSearch,
} from './events.entity';

export interface EventsRepository {
  getTrendingEvents(limit: number, offset: number): Promise<TrendingEvents[]>;
  getThisWeekEvents(limit: number, offset: number): Promise<ThisWeekEvents[]>;
  getUpcomingEvents(limit: number, offset: number): Promise<UpcomingEvents[]>;
  getInputSearchTrendingEvents(
    data: InputSearch,
    limit: number,
    offset: number,
  ): Promise<TrendingEvents[]>;
  getInputSearchThisWeekEvents(
    data: InputSearch,
    limit: number,
    offset: number,
  ): Promise<ThisWeekEvents[]>;
  getInputSearchUpcomingEvents(
    data: InputSearch,
    limit: number,
    offset: number,
  ): Promise<UpcomingEvents[]>;
}
