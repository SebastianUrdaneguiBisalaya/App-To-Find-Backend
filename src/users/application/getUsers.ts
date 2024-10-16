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