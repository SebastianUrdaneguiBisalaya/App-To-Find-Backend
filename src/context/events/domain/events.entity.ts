export interface Events {
  event_id: string;
  event_name: string;
  event_category: string;
  event_date: Date;
  event_hour: Date;
  event_place: string;
  event_latitude: number;
  event_longitude: number;
  event_capicity: number;
  event_img: string;
  event_description: string;
  event_artist: string;
}

export interface TrendingEvents
  extends Omit<
    Events,
    | 'event_category'
    | 'event_hour'
    | 'event_hour'
    | 'event_latitude'
    | 'event_longitude'
    | 'event_capicity'
    | 'event_description'
  > {
  event_price: number | undefined;
  total_purchases: number | undefined;
}

export interface ThisWeekEvents
  extends Omit<
    Events,
    | 'event_category'
    | 'event_hour'
    | 'event_hour'
    | 'event_latitude'
    | 'event_longitude'
    | 'event_capicity'
    | 'event_description'
  > {
  event_price: number | undefined;
}

export interface UpcomingEvents
  extends Omit<
    Events,
    | 'event_category'
    | 'event_hour'
    | 'event_hour'
    | 'event_latitude'
    | 'event_longitude'
    | 'event_capicity'
    | 'event_description'
  > {
  event_price: number | undefined;
}
