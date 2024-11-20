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
    | 'event_hour'
    | 'event_hour'
    | 'event_latitude'
    | 'event_longitude'
    | 'event_capicity'
    | 'event_description'
  > {
  event_price: number | undefined;
  total_purchases: number | undefined;
  is_favorite: boolean;
}

export interface ThisWeekEvents
  extends Omit<
    Events,
    | 'event_hour'
    | 'event_hour'
    | 'event_latitude'
    | 'event_longitude'
    | 'event_capicity'
    | 'event_description'
  > {
  event_price: number | undefined;
  is_favorite: boolean;
}

export interface UpcomingEvents
  extends Omit<
    Events,
    | 'event_hour'
    | 'event_hour'
    | 'event_latitude'
    | 'event_longitude'
    | 'event_capicity'
    | 'event_description'
  > {
  event_price: number | undefined;
  is_favorite: boolean;
}

export interface InputSearch {
  event_date_start?: Date;
  event_date_end?: Date;
  event_name?: string;
}

export interface Tickets {
  ticket_id: string;
  event_id: string;
  ticket_type: string;
  ticket_price: string;
  ticket_quantity: number;
}

export interface EventDetailById {
  event_name: string;
  event_category: string;
  event_date: Date;
  event_hour: Date;
  event_place: string;
  event_latitude: number;
  event_longitude: number;
  event_capacity: number;
  event_img: string;
  event_description: string;
  event_artist: string;
  pre_sale_date: Date;
  pre_sale_end_date: Date;
  pre_sale_discount: number;
  tickets: Tickets[];
}

export interface UserHistoryEventsResponse {
  order_id: string;
  order_date: string;
  event_name: string;
  event_date: string;
  event_place: string;
  event_hour: string;
  onClickData: {
    order_date: string;
    purchases: {
      ticket_id: string;
      event_name: string;
      event_date: string;
      event_place: string;
      order_id: string;
      event_hour: string;
      ticket_type: string;
      bar_code: string;
      purchase_quantity: number;
    }[];
  };
}

export interface FavoriteEvents {
  event_favorite_id: string;
  event_id: string;
  user_id: string;
  is_favorite: boolean;
}
