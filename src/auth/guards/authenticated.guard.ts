import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { User, USER_ROLES_TYPE } from 'src/models/user';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  public constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest<Request>();
    if (!request.user) return false;

    const roles = this.reflector.get<USER_ROLES_TYPE[]>(
      'roles',
      context.getHandler(),
    );

    if (!roles) return true;

    const user = request.user as User;

    return roles.includes(user.role);
  }
}
