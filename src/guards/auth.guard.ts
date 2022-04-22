import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly config: ConfigService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const { authorization } = context.switchToHttp().getRequest().headers;
    const secret = this.config.get('JWT_SECRET');
    if (!authorization) throw new UnauthorizedException();
    try {
      verify(authorization.split(' ')[1], secret);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
    return true;
  }
}
