import { init } from '@apap/config-mapper';
import { IAppConfig } from './interfaces/app.interface';
import { ILoggerMonitoringProvider } from './interfaces/logger.interface';
const configMapper = init();

export const logger = configMapper<ILoggerMonitoringProvider>([
  ['APPLICATION_INSIGHT_ID', 'applicationInsightId', 'string', 'f1466292-f5f7-4692-ac79-6d9ae5c75f63'],
]);

export const app = configMapper<IAppConfig>([
  ['APP_NAME', 'name', 'string', 'Facade-IB-Customer-Backend'],
  ['APP_MODE', 'mode', 'string', 'APP'],
  ['APP_VERSION', 'version', 'string', '1.0'],
  ['APP_DESCRIPTION', 'description', 'string', 'No description'],
  ['APP_PORT', 'port', 'number', 3000],
]);
export default () => {
    return {
      port: parseInt(process.env.PORT, 10) || 3000,
      logger,
      app
    };
  };
