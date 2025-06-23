import * as userRepo from './user.repository';
import { User } from './models/user.model';

export async function createUser(user: User): Promise<User> {
  return userRepo.createUser(user);
}

export async function getUserById(id: string): Promise<User | null> {
  return userRepo.getUserById(id);
}
