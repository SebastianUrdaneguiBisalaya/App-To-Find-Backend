import {
  User,
} from './users.entity';

export interface UsersRepository {
  getUsers(): Promise<User[]>;
}

export interface UsersRepository {
  getUserById(user_id: string): Promise<User | null>;
}
