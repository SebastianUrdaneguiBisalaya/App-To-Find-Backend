import {
  User,
} from './users.entity';

export interface UsersRepository {
  getUsers(): Promise<User[]>;
}
