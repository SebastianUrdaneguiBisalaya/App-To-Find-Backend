export interface SignUpResponse {
  id: string;
  email: string;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
  };
  token: string;
}
