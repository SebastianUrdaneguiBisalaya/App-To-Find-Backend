import { UsersRepository } from '../domain/users.repository';

export const getUsers = (
  usersRepository: UsersRepository
) => {
  try {
    return usersRepository.getUsers();
  } catch (error) {
    throw new Error(`Unnable to get users ${error}`);
  }
};

export const getUserById = (usersRepository: UsersRepository, user_id: string) => {
  try {
    return usersRepository.getUserById(user_id);
  } catch (error) {
    throw new Error(`Unable to get user by ID: ${error}`);
  }
};