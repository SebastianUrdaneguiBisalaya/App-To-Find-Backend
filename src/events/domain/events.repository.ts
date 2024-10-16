import {
  TrendingEvents,
  ThisWeekEvents,
  UpcomingEvents,
} from './events.entity';

export interface EventsRepository {
  getTrendingEvents(limit: number, offset: number): Promise<TrendingEvents[]>;
  getThisWeekEvents(limit: number, offset: number): Promise<ThisWeekEvents[]>;
  getUpcomingEvents(limit: number, offset: number): Promise<UpcomingEvents[]>;
}
