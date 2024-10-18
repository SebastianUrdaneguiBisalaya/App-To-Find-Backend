import { UsersRepository } from '../domain/users.repository';
import { prisma } from '../../database/database';
import { User } from '../domain/users.entity';

export const projectPrismaRepository: UsersRepository = {
  async getUsers(): Promise<User[]> {
    try {
      const users = await prisma.user.findMany();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Could not fetch users');
    }
  },

  async getUserById(user_id: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: { user_id },
      });
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Could not fetch user by ID');
    }
  },
};