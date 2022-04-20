import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;
    if (!authorization) throw new UnauthorizedException();
    try {
      verify(authorization.split(' ')[1], 'secret');
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
