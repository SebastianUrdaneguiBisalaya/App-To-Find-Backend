import { prisma } from '../../../../database/database';
import { User } from '../../domain/user.entity';
import { UserRepository } from '../../domain/user.repository';

export const userPrismaRepository: UserRepository = {
  async findUserByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        user_email: email,
      },
    });
  },
  async create(user: Omit<User, 'user_id' | 'user_avatar'>): Promise<User> {
    return await prisma.user.create({
      data: user,
    });
  },

  async update(id: string, data: Partial<User>): Promise<void> {
    await prisma.user.update({
      where: {
        user_id: id,
      },
      data,
    });
  },
};
