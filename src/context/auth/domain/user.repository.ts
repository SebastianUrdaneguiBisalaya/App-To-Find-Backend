import { CreateUser, User } from './user.entity';

export interface UserRepository {
  findUserByEmail(email: string): Promise<User | null>;
  create(user: CreateUser): Promise<User>;
  update(id: string, data: Partial<User>): Promise<void>;
}
