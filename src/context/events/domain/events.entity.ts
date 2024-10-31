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

export interface UserHistoryEvents {
  user_id: string;
  user_name: string;
  user_lastname: string;
  orders: {
    order_id: string;
    order_date: Date;
    event: {
      event_id: string;
      event_name: string;
      event_date: Date;
      event_hour: Date;
      event_place: string;
      event_country: string;
      event_artist: string;
    };
    purchases: {
      purchase_id: string;
      purchase_amount: number;
      bar_code: string;
      ticket: {
        ticket_id: string;
        ticket_type: string;
        ticket_price: number;
      };
    }[];
  }[];
}
