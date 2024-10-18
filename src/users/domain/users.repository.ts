import {
  User,
} from './users.entity';

export interface UsersRepository {
  getUsers(): Promise<User[]>;
}

export interface UsersRepository {
  getUserByEmail(user_email: string): Promise<User | null>;
}
