import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  NotFoundException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user';

@Injectable()
export class ExcludeDeletedusers implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((value: unknown | unknown[]) => {
        if (
          Array.isArray(value) &&
          value.every((item) => item instanceof User)
        ) {
          const users = value as User[];

          const filteredUsers = users.filter(
            (user) => user.isDeleted === false,
          );

          if (filteredUsers.length === 0) {
            throw new NotFoundException('Users not found');
          }

          return filteredUsers;
        } else if (value instanceof User) {
          if (value.isDeleted === true) {
            throw new NotFoundException('User not found');
          } else {
            return value;
          }
        } else return value;
      }),
    );
  }
}
