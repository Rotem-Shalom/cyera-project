export interface CreateUserRequest {
  name: string;
  email: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  created_at: string;
}
