import { EventsRepository } from '../domain/events.repository';
import {
  EventDetailById,
  InputSearch,
  ThisWeekEvents,
  TrendingEvents,
  UpcomingEvents,
  UserHistoryEventsResponse,
} from '../domain/events.entity';
import { Prisma } from '@prisma/client';
import { prisma } from '../../../database/database';

export const projectPrismaRepository: EventsRepository = {
  getTrendingEvents: async (limit: number, offset: number, sort?: string) => {
    const sortDirection = sort === 'asc' ? Prisma.sql`ASC` : Prisma.sql`DESC`;

    const data: TrendingEvents[] = await prisma.$queryRaw`
      SELECT e.*, MIN(t.ticket_price) AS event_price, COUNT(p.purchase_id) AS total_purchases
      FROM "Event" e
      LEFT JOIN "Ticket" t ON e.event_id = t.event_id
      LEFT JOIN "Purchase" p ON t.ticket_id = p.ticket_id
      WHERE e.event_date >= NOW()
      GROUP BY e.event_id
      ORDER BY e.event_date ASC, total_purchases DESC, event_price ${sortDirection}
      LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`};
    `;

    return data.map((event) => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_place: event.event_place,
      event_category: event.event_category,
      event_img: event.event_img,
      event_artist: event.event_artist,
      event_price: event.event_price,
      total_purchases: Number(event.total_purchases),
    }));
  },
  getThisWeekEvents: async (limit: number, offset: number, sort?: string) => {
    const sortDirection = sort === 'asc' ? Prisma.sql`ASC` : Prisma.sql`DESC`;
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const data: ThisWeekEvents[] = await prisma.$queryRaw`
    SELECT e.*, MIN(t.ticket_price) AS event_price
    FROM "Event" e
    LEFT JOIN "Ticket" t ON e.event_id = t.event_id
    WHERE e.event_date >= NOW() AND e.event_date < ${Prisma.sql`${sevenDaysFromNow}`}
    GROUP BY e.event_id
    ORDER BY e.event_date ASC, event_price ${sortDirection}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`};
    `;
    return data.map((event) => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_place: event.event_place,
      event_img: event.event_img,
      event_artist: event.event_artist,
      event_category: event.event_category,
      event_price: event.event_price,
    }));
  },
  getUpcomingEvents: async (limit: number, offset: number, sort?: string) => {
    const sortDirection = sort === 'asc' ? Prisma.sql`ASC` : Prisma.sql`DESC`;
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const data: ThisWeekEvents[] = await prisma.$queryRaw`
    SELECT e.*, MIN(t.ticket_price) AS event_price, COUNT(p.purchase_id) AS total_purchases
    FROM "Event" e
    LEFT JOIN "Ticket" t ON e.event_id = t.event_id
    LEFT JOIN "Purchase" p ON t.ticket_id = p.ticket_id
    WHERE e.event_date >= ${Prisma.sql`${sevenDaysFromNow}`}
    GROUP BY e.event_id
    ORDER BY e.event_date ASC, total_purchases DESC, event_price ${sortDirection}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`};
    `;
    return data.map((event) => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_place: event.event_place,
      event_img: event.event_img,
      event_artist: event.event_artist,
      event_category: event.event_category,
      event_price: event.event_price,
    }));
  },

  getInputSearchTrendingEvents: async (
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
  ) => {
    const sortDirection = sort === 'asc' ? Prisma.sql`ASC` : Prisma.sql`DESC`;
    const { event_date_start, event_date_end, event_name } = data;
    const result: TrendingEvents[] = await prisma.$queryRaw`
    SELECT e.*, MIN(t.ticket_price) AS event_price, COUNT(p.purchase_id) AS total_purchases
    FROM "Event" e
    LEFT JOIN "Ticket" t ON e.event_id = t.event_id
    LEFT JOIN "Purchase" p ON t.ticket_id = p.ticket_id
    WHERE
    (e.event_date BETWEEN ${event_date_start} AND ${event_date_end})
    AND (LOWER(e.event_name) LIKE LOWER('%' || ${event_name || ''} || '%') OR ${event_name || ''} IS NULL)
    GROUP BY e.event_id
    ORDER BY e.event_date ASC, total_purchases DESC, event_price ${sortDirection}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`};
    `;
    return result.map((event) => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_place: event.event_place,
      event_img: event.event_img,
      event_artist: event.event_artist,
      event_category: event.event_category,
      event_price: event.event_price,
      total_purchases: Number(event.total_purchases),
    }));
  },

  getInputSearchThisWeekEvents: async (
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
  ) => {
    const { event_date_end, event_name } = data;
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    let finalDate;
    if (event_date_end && event_date_end > new Date()) {
      finalDate = sevenDaysFromNow;
    } else {
      finalDate = event_date_end;
    }
    const sortDirection = sort === 'asc' ? Prisma.sql`ASC` : Prisma.sql`DESC`;
    const result: ThisWeekEvents[] = await prisma.$queryRaw`
    SELECT e.*, MIN(t.ticket_price) AS event_price
    FROM "Event" e
    LEFT JOIN "Ticket" t ON e.event_id = t.event_id
    WHERE
    (e.event_date >= NOW() AND e.event_date < ${finalDate || sevenDaysFromNow})
    AND (LOWER(e.event_name) LIKE LOWER('%' || ${event_name || ''} || '%') OR ${event_name || ''} IS NULL)
    GROUP BY e.event_id
    ORDER BY e.event_date ASC, event_price ${sortDirection}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`};
    `;
    return result.map((event) => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_place: event.event_place,
      event_img: event.event_img,
      event_artist: event.event_artist,
      event_category: event.event_category,
      event_price: event.event_price,
    }));
  },

  getInputSearchUpcomingEvents: async (
    data: InputSearch,
    limit: number,
    offset: number,
    sort?: string,
  ) => {
    const { event_date_end, event_name } = data;
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const sortDirection = sort === 'asc' ? Prisma.sql`ASC` : Prisma.sql`DESC`;
    const result: UpcomingEvents[] = await prisma.$queryRaw`
    SELECT e.*, MIN(t.ticket_price) AS event_price
    FROM "Event" e
    LEFT JOIN "Ticket" t ON e.event_id = t.event_id
    WHERE
    (e.event_date >= ${sevenDaysFromNow} AND e.event_date < ${event_date_end || ''})
    AND (LOWER(e.event_name) LIKE LOWER('%' || ${event_name || ''} || '%') OR ${event_name || ''} IS NULL)
    GROUP BY e.event_id
    ORDER BY e.event_date ASC, event_price ${sortDirection}
    LIMIT ${Prisma.sql`${limit}`} OFFSET ${Prisma.sql`${offset}`};
    `;
    return result.map((event) => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_place: event.event_place,
      event_img: event.event_img,
      event_artist: event.event_artist,
      event_category: event.event_category,
      event_price: event.event_price,
    }));
  },

  getUserHistoryEvents: async (
    userId: string,
  ): Promise<UserHistoryEventsResponse[] | null> => {
    const result = await prisma.user.findUnique({
      where: {
        user_id: userId,
      },
      select: {
        orders: {
          orderBy: {
            order_date: 'desc',
          },
          select: {
            order_id: true,
            order_date: true,
            event: {
              select: {
                event_name: true,
                event_date: true,
                event_place: true,
                event_hour: true,
              },
            },
            purchases: {
              select: {
                purchase_amount: true,
                bar_code: true,
                ticket: {
                  select: {
                    ticket_id: true,
                    ticket_type: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!result) return null;

    const formatedHistory: UserHistoryEventsResponse[] | null =
      result.orders.map((order) => ({
        order_id: order.order_id,
        order_date: order.order_date.toISOString().split('T')[0],
        event_name: order.event.event_name,
        event_date: order.event.event_date.toLocaleDateString('es-ES', {
          weekday: 'long',
        }),
        event_place: order.event.event_place,
        event_hour: order.event.event_hour.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        onClickData: {
          order_date: order.order_date.toISOString().split('T')[0],
          purchases: order.purchases.map((purchase) => ({
            ticket_id: purchase.ticket.ticket_id,
            event_name: order.event.event_name,
            event_date: order.event.event_date.toISOString().split('T')[0],
            event_place: order.event.event_place,
            order_id: order.order_id,
            event_hour: order.event.event_hour.toLocaleTimeString('es-ES', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }),
            ticket_type: purchase.ticket.ticket_type,
            bar_code: purchase.bar_code,
            purchase_quantity: 1,
          })),
        },
      }));

    return formatedHistory;
  },

  getMyFavoriteEvents: async (userId: string) => {
    const data: ThisWeekEvents[] = await prisma.$queryRaw`
      SELECT e.*, ev.event_name, ev.event_date, ev.event_place, ev.event_category,
      ev.event_img, ev.event_img, ev.event_artist, MIN(t.ticket_price) AS event_price
      FROM "EventFavorite" e
      LEFT JOIN "Event" ev ON e.event_id = ev.event_id
      LEFT JOIN "Ticket" t ON e.event_id = t.event_id
      LEFT JOIN "Purchase" p ON t.ticket_id = p.ticket_id
      WHERE e.user_id = ${Prisma.sql`${userId}`} AND e.is_favorite = true
      GROUP BY e.event_id, ev.event_name, ev.event_date, ev.event_place, ev.event_category,
      ev.event_img, ev.event_img, ev.event_artist, e.event_favorite_id, e.user_id, e.event_id, e.is_favorite
      ORDER BY ev.event_date ASC;
    `;

    return data.map((event) => ({
      event_id: event.event_id,
      event_name: event.event_name,
      event_date: event.event_date,
      event_place: event.event_place,
      event_category: event.event_category,
      event_img: event.event_img,
      event_artist: event.event_artist,
      event_price: event.event_price,
    }));
  },

  addEventToFavorite: async (userId: string, eventId: string) => {
    await prisma.eventFavorite.create({
      data: {
        user_id: userId,
        event_id: eventId,
        is_favorite: true,
      },
    });
  },

  updateEventToFavorite: async (userId: string, eventId: string) => {
    await prisma.eventFavorite.update({
      where: {
        user_id_event_id: {
          user_id: userId,
          event_id: eventId,
        },
      },
      data: {
        is_favorite: false,
      },
    });
  },

  getEventDetailById: async (id: string) => {
    const result = await prisma.event.findUnique({
      where: {
        event_id: id,
      },
      include: {
        tickets: true,
      },
    });
    if (!result) {
      throw new Error(`Event with ID ${id} not found`);
    }
    const eventDetail: EventDetailById = {
      event_name: result.event_name,
      event_category: result.event_category,
      event_date: result.event_date,
      event_hour: result.event_hour,
      event_place: result.event_place,
      event_latitude: result.event_latitude,
      event_longitude: result.event_longitude,
      event_capacity: result.event_capacity,
      event_img: result.event_img,
      event_description: result.event_description,
      event_artist: result.event_artist,
      pre_sale_date: result.pre_sale_date,
      pre_sale_end_date: result.pre_sale_end_date,
      pre_sale_discount: result.pre_sale_discount,
      tickets: result.tickets.map((ticket) => ({
        ticket_id: ticket.ticket_id,
        event_id: ticket.event_id,
        ticket_type: ticket.ticket_type,
        ticket_price: ticket.ticket_price.toString(),
        ticket_quantity: ticket.ticket_quantity,
      })),
    };
    return eventDetail;
  },
};
