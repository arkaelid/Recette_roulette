export interface User {
  id: number;
  identifiant: string;
  date_creation: Date;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
} 