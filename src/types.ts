import { Request } from 'express';
import { User, USER_STATUS_TYPE } from './models/user';

export interface RequestType extends Request {
  user: User;
}

export type QueryUserType = USER_STATUS_TYPE | 'all';
