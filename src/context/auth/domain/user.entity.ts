export interface User {
  user_id: string;
  user_name: string;
  user_lastname: string;
  user_email: string;
  user_password: string;
  user_avatar?: string | null;
  verified: boolean;
}

export type CreateUser = Omit<User, 'user_id' | 'verified' | 'user_avatar'>;
