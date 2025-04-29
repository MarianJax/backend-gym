import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  LOGIN_URL_DEV: process.env.LOGIN_URL_DEV,
  LOGIN_URL_PROD: process.env.LOGIN_URL_PROD,
  X_API_KEY: process.env.X_API_KEY,
  DEV: process.env.DEVELOPMENT === 'true',
  URL_INSTITUCION: process.env.URL_INSTITUCION,
}));
