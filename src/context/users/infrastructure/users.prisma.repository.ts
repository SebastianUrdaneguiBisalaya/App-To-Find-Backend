import { UsersRepository } from '../domain/users.repository';
import { prisma } from '../../../database/database';
import { User } from '../domain/users.entity';

export const projectPrismaRepository: UsersRepository = {
  getUserById: async (userId: string): Promise<User | null> => {
    const user = await prisma.user.findUnique({
      where: { user_id: userId },
    });
    return user;
  },

  updateUser: async (userId: string, user: Partial<User>): Promise<User> => {
    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: user,
    });
    return updatedUser;
  },

  deleteUser: async (userId: string): Promise<void> => {
    const deleteUser = await prisma.user.delete({
      where: {
        user_id: userId,
      },
    });
  },
};
