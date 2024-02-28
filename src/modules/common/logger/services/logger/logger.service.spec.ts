import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Logger } from './logger.service';
jest.mock('@apap/logger', () => {
  return {
    AppLogger: jest.fn().mockImplementation(() => {
      return {
        info: jest.fn(),
        log: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      };
    }),
  };
});
jest.mock('@apap/event-manager', () => {
  return {
    // tslint:disable-next-line:max-line-length
    EventManager: jest.fn().mockImplementation(() => {
      return { eventManager: { on: jest.fn() } };
    }),
  };
});
describe('LoggerService', () => {
  let service: Logger;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Logger, ConfigService],
    }).compile();

    service = module.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('log level info should be called', () => {
    const n = jest.spyOn(service, 'log');
    service.log({serviceName:'',requestId:''});
    expect(n).toBeCalledTimes(1);
  });
  it('log level error should be called', () => {
    const n = jest.spyOn(service, 'error');
    service.error({serviceName:'asd',requestId:''});
    expect(n).toBeCalledTimes(1);
  });
  it('log level warn should be called', () => {
    const n = jest.spyOn(service, 'warn');
    service.warn({serviceName:'123123',requestId:''});
    expect(n).toBeCalledTimes(1);
  });
});
