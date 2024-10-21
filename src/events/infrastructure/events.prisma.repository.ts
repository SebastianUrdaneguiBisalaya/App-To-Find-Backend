import { EventsRepository } from '../domain/events.repository';
import { prisma } from '../../database/database';
import { InputSearch } from '../domain/events.entity';
import { Prisma } from '@prisma/client';

export const projectPrismaRepository: EventsRepository = {
  getTrendingEvents: async (limit: number, offset: number) => {
    const data = await prisma.event.findMany({
      where: {
        event_date: {
          gte: new Date(),
        },
      },
      orderBy: {
        event: {
          purchases: {
            _count: 'desc',
          },
        },
      },
      select: {
        event_id: true,
        event_name: true,
        event_date: true,
        event_place: true,
        event_img: true,
        event_artist: true,
        tickets: {
          select: {
            ticket_price: true,
            purchase: {
              select: {
                purchase_id: true,
              },
            },
          },
        },
      },
      take: limit,
      skip: offset,
    });
    const trendingEvents = data.map((event) => {
      const minPrice = event?.tickets?.length
        ? Math.min(...event.tickets.map((ticket) => ticket.ticket_price))
        : undefined;
      const totalPurchases = event?.tickets?.reduce(
        (total, ticket) => total + (ticket?.purchase?.length || 0),
        0,
      );
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        event_date: event.event_date,
        event_place: event.event_place,
        event_img: event.event_img,
        event_artist: event.event_artist,
        event_price: minPrice,
        total_purchases: totalPurchases,
      };
    });
    return trendingEvents;
  },
  getThisWeekEvents: async (limit: number, offset: number) => {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const data = await prisma.event.findMany({
      where: {
        event_date: {
          gte: new Date(),
          lt: sevenDaysFromNow,
        },
      },
      orderBy: {
        event: {
          purchases: {
            _count: 'desc',
          },
        },
      },
      select: {
        event_id: true,
        event_name: true,
        event_date: true,
        event_place: true,
        event_img: true,
        event_artist: true,
        tickets: {
          select: {
            ticket_price: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });
    const thisWeekEvents = data.map((event) => {
      const minPrice = event?.tickets?.length
        ? Math.min(...event.tickets.map((ticket) => ticket.ticket_price))
        : undefined;
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        event_date: event.event_date,
        event_place: event.event_place,
        event_img: event.event_img,
        event_artist: event.event_artist,
        event_price: minPrice,
      };
    });
    return thisWeekEvents;
  },
  getUpcomingEvents: async (limit: number, offset: number) => {
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const data = await prisma.event.findMany({
      where: {
        event_date: {
          gt: sevenDaysFromNow,
        },
      },
      orderBy: {
        event: {
          purchases: {
            _count: 'desc',
          },
        },
      },
      select: {
        event_id: true,
        event_name: true,
        event_date: true,
        event_place: true,
        event_img: true,
        event_artist: true,
        tickets: {
          select: {
            ticket_price: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });
    const upcomingEvents = data.map((event) => {
      const minPrice = event?.tickets?.length
        ? Math.min(...event.tickets.map((ticket) => ticket.ticket_price))
        : undefined;
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        event_date: event.event_date,
        event_place: event.event_place,
        event_img: event.event_img,
        event_artist: event.event_artist,
        event_price: minPrice,
      };
    });
    return upcomingEvents;
  },

  getInputSearchTrendingEvents: async (
    data: InputSearch,
    limit: number,
    offset: number,
  ) => {
    const { event_date_start, event_date_end, event_name } = data;
    const filters: Prisma.EventWhereInput = {};

    if (event_date_start && event_date_end) {
      filters.event_date = {
        gte: event_date_start,
        lte: event_date_end,
      };
    }

    if (event_name) {
      filters.OR = [
        { event_name: { contains: event_name, mode: 'insensitive' } },
      ];
    }

    const result = await prisma.event.findMany({
      where: { ...filters },
      orderBy: {
        event: {
          purchases: {
            _count: 'desc',
          },
        },
      },
      select: {
        event_id: true,
        event_name: true,
        event_date: true,
        event_place: true,
        event_img: true,
        event_artist: true,
        tickets: {
          select: {
            ticket_price: true,
            purchase: {
              select: {
                purchase_id: true,
              },
            },
          },
        },
      },
      take: limit,
      skip: offset,
    });

    const trendingEvents = result.map((event) => {
      const minPrice = event?.tickets?.length
        ? Math.min(...event.tickets.map((ticket) => ticket.ticket_price))
        : undefined;
      const totalPurchases = event?.tickets?.reduce(
        (total, ticket) => total + (ticket?.purchase?.length || 0),
        0,
      );
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        event_date: event.event_date,
        event_place: event.event_place,
        event_img: event.event_img,
        event_artist: event.event_artist,
        event_price: minPrice,
        total_purchases: totalPurchases,
      };
    });

    return trendingEvents;
  },

  getInputSearchThisWeekEvents: async (
    data: InputSearch,
    limit: number,
    offset: number,
  ) => {
    const { event_date_start, event_name } = data;
    const filters: Prisma.EventWhereInput = {};

    let today: Date;
    let sevenDaysFromNow: Date;
    if (event_date_start && event_date_start >= new Date()) {
      today = new Date(event_date_start);
      sevenDaysFromNow = new Date(event_date_start);
    } else {
      sevenDaysFromNow = new Date();
      today = new Date();
    }
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    filters.event_date = {
      gte: today,
      lt: sevenDaysFromNow,
    };

    if (event_name) {
      filters.OR = [
        { event_name: { contains: event_name, mode: 'insensitive' } },
      ];
    }
    const result = await prisma.event.findMany({
      where: {
        ...filters,
      },
      orderBy: {
        event: {
          purchases: {
            _count: 'desc',
          },
        },
      },
      select: {
        event_id: true,
        event_name: true,
        event_date: true,
        event_place: true,
        event_img: true,
        event_artist: true,
        tickets: {
          select: {
            ticket_price: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });
    const thisWeekEvents = result.map((event) => {
      const minPrice = event?.tickets?.length
        ? Math.min(...event.tickets.map((ticket) => ticket.ticket_price))
        : undefined;
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        event_date: event.event_date,
        event_place: event.event_place,
        event_img: event.event_img,
        event_artist: event.event_artist,
        event_price: minPrice,
      };
    });
    return thisWeekEvents;
  },

  getInputSearchUpcomingEvents: async (
    data: InputSearch,
    limit: number,
    offset: number,
  ) => {
    const { event_date_start, event_name } = data;
    const filters: Prisma.EventWhereInput = {};

    let start: Date;
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    if (event_date_start && event_date_start > sevenDaysFromNow) {
      start = new Date(event_date_start);
    } else {
      start = sevenDaysFromNow;
    }

    filters.event_date = {
      gte: start,
    };

    if (event_name) {
      filters.OR = [
        { event_name: { contains: event_name, mode: 'insensitive' } },
      ];
    }
    const result = await prisma.event.findMany({
      where: {
        ...filters,
      },
      orderBy: [
        {
          event_date: 'asc',
        },
        {
          event: {
            purchases: {
              _count: 'desc',
            },
          },
        },
      ],
      select: {
        event_id: true,
        event_name: true,
        event_date: true,
        event_place: true,
        event_img: true,
        event_artist: true,
        tickets: {
          select: {
            ticket_price: true,
          },
        },
      },
      take: limit,
      skip: offset,
    });
    const upcomingEvents = result.map((event) => {
      const minPrice = event?.tickets?.length
        ? Math.min(...event.tickets.map((ticket) => ticket.ticket_price))
        : undefined;
      return {
        event_id: event.event_id,
        event_name: event.event_name,
        event_date: event.event_date,
        event_place: event.event_place,
        event_img: event.event_img,
        event_artist: event.event_artist,
        event_price: minPrice,
      };
    });
    return upcomingEvents;
  },
};
