import { HttpExceptionFilter } from './exception.filter';
import {
  HttpException
} from '@nestjs/common';

describe('ExceptionFilter', () => {
const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
    json: mockJson
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
    status: mockStatus
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
    getResponse: mockGetResponse,
    getRequest: jest.fn()
}));

const mockArgumentsHost = {
    switchToHttp: mockHttpArgumentsHost,
    getArgByIndex: jest.fn(),
    getArgs: jest.fn(),
    getType: jest.fn(),
    switchToRpc: jest.fn(),
    switchToWs: jest.fn(),
    getRequest : jest.fn(),
    url: jest.fn(),
};
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });
  it('should trhow an exeception', async () => {
      const filter = new HttpExceptionFilter();
      expect(filter.catch(new HttpException('Bad Request',500),mockArgumentsHost)).not.toBeDefined();
  });
});
