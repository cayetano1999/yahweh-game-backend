import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {

  constructor() {
  }

  public async validateToken(token: string): Promise<boolean> {
    //return this.rabbitService.tokenValidator.validate(token);
    return true
  }
}
