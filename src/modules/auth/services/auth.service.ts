import { RabbitService } from './../../common/rabbit/services/rabbit/rabbit.service';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class AuthService {

  constructor(@Inject(RabbitService) private readonly rabbitService: RabbitService) {
  }

  public async validateToken(token: string): Promise<boolean> {
    return this.rabbitService.tokenValidator.validate(token);
  }
}
