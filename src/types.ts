import { Request } from 'express';
import { User } from './models/user';

export interface RequestType extends Request {
  user: User;
}
