import { SetMetadata } from '@nestjs/common';
import { USER_ROLES_TYPE } from 'src/models/user';

export const Roles = (...roles: USER_ROLES_TYPE[]) =>
  SetMetadata('roles', roles);
