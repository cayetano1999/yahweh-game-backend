import { registerAs } from '@nestjs/config';
export default registerAs('rabbit', () => ({
  url: process.env.EVENT_MNG_URL,
  emitAndWaitTimeout: process.env.EVENT_MNG_EMIT_AND_WAIT_TIMEOUT,
  logLevel: process.env.EVENT_MNG_LOG_LEVEL,
  application: process.env.APP_NAME,
}));
