import { registerAs } from '@nestjs/config';
export default registerAs('logger', () => ({
  appInsightsId: process.env.APP_INSIGHTS_ID,
  appMode: process.env.APP_MODE,
  appVersion: process.env.APP_VERSION,
  appDescription: process.env.APP_DESCRIPTION,
  appName: process.env.APP_NAME,
}));
