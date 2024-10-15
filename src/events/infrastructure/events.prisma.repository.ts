import { EventsRepository } from '../domain/events.repository';
import { prisma } from '../../database/database';
import { Events } from '../domain/events.entity';

export const projectPrismaRepository: EventsRepository = {
  getTrendingEvents: async () => {
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
    });
    const tendingEvents = data.map((event) => {
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
    return tendingEvents;
  },
};
