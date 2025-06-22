import { Request, Response } from 'express';
import * as userService from './userService';
import { publishToQueue } from './mq/mqProducer';

export async function createUser(req: Request, res: Response) {
  console.log('createUser with request');
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
    publishToQueue('user.created', user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
