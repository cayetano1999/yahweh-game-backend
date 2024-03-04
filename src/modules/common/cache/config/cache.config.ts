import { registerAs } from '@nestjs/config';
export default registerAs('cache', () => ({
  host: process.env.CACHE_HOST,
  port: Number(process.env.CACHE_PORT),
  password: process.env.CACHE_PASSWORD,
  tls: {
    servername: process.env.CACHE_HOST,
  },
  expiration: +process.env.CACHE_EXP || 8600,
}));
