import {
  TrendingEvents,
  ThisWeekEvents,
  UpcomingEvents,
} from './events.entity';

export interface EventsRepository {
  getTrendingEvents(): Promise<TrendingEvents[]>;
  getThisWeekEvents(): Promise<ThisWeekEvents[]>;
  getUpcomingEvents(): Promise<UpcomingEvents[]>;
}
