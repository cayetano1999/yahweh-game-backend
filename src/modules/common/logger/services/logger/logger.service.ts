import { LoggerModel } from './../../models/logger.model';
import { ConfigService } from '@nestjs/config';
import { Injectable, LoggerService } from '@nestjs/common';
import { AppLogger } from '@apap/logger';
@Injectable()
export class Logger implements LoggerService {
  private readonly logger: AppLogger;
  /**
   *
   */
  constructor(private readonly config: ConfigService) {
    this.logger = new AppLogger({
      applicationInsightId: this.config.get<string>('logger.appInsightsId'),
      appMode: this.config.get<string>('logger.appMode'),
      description: this.config.get<string>('logger.appDescription'),
      appName: this.config.get<string>('logger.appName'),
      appVersion: this.config.get<string>('logger.appVersion'),
    });
  }
  log(message: LoggerModel) {
    this.logger.info(message as any);
  }
  error(message: LoggerModel) {
    this.logger.error(message as any);
  }
  warn(message: LoggerModel) {
    this.logger.warn(message as any);
  }
  debug(model: LoggerModel){
    this.logger.debug(model as any);
  }
}
