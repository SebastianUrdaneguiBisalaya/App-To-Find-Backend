import { SignUpRequest } from '../schema/signUp.schema';
import { CreateUser } from '../domain/user.entity';

export const mapUserToDB = (
  data: SignUpRequest,
  hashedPassword: string,
): CreateUser => {
  return {
    user_name: data.firstName,
    user_lastname: data.lastName,
    user_email: data.email,
    user_password: hashedPassword,
  };
};
