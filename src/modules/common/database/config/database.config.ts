import { registerAs } from '@nestjs/config';
import { isSsl } from './typeorm.config';
export default registerAs('database', () => ({
  type: 'mongodb',
  url: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.{ts,js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  useNewUrlParser: true,
  ssl: isSsl(process.env.DATABASE_USE_SSL || 'TRUE'),
  migrationsRun: true,
  synchronize: false,
  logging: true,
  loggerLevel: 'error',
  retryAttempts: 20
}));
