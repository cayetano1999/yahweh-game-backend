
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { extractJwt } from '../utils/auth.util';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  /**
   *
   */
  constructor(
    @Inject(AuthService)
    private readonly auth: AuthService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!request.headers.authorization) {
      throw new UnauthorizedException();
    }
    const jwt = extractJwt(request.headers);
    return this.auth.validateToken(jwt);
  }
}
