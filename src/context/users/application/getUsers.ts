import { UsersRepository } from '../domain/users.repository';
import { User } from '../domain/users.entity';

export const getUserById = (
  userRepository: UsersRepository,
  userId: string,
) => {
  try {
    return userRepository.getUserById(userId);
  } catch (error) {
    throw new Error(`Unable to get user by ID: ${error}`);
  }
};

export const updateUser = (
  userRepository: UsersRepository,
  userId: string,
  user: Partial<User>,
) => {
  try {
    return userRepository.updateUser(userId, user);
  } catch (error) {
    throw new Error(`Unable to update user: ${error}`);
  }
};

export const deleteUser = (
  userRepository: UsersRepository,
  userId: string
) => {
  try {
    return userRepository.deleteUser(userId);
  } catch (error) {
    throw new Error(`Unable to delete user: ${error}`);
  }
};