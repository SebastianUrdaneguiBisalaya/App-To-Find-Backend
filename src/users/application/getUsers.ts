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

export const getUserByEmail = (usersRepository: UsersRepository, user_email: string) => {
  try {
    return usersRepository.getUserByEmail(user_email);
  } catch (error) {
    throw new Error(`Unable to get user by ID: ${error}`);
  }
};