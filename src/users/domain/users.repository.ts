import { User } from './users.entity';

export interface UsersRepository {
  getUserById(userId: string): Promise<User | null>; 
  getUserByEmail(email: string): Promise<User | null>; 
  updateUser(userId: string, user: Partial<User>): Promise<User>; 
}