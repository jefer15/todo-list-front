export interface User {
  id: number;
  email: string;
  password?: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}