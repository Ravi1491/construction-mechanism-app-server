import 'dotenv/config';

const { NODE_ENV } = process.env;

const env = NODE_ENV || 'development';

export const applicationConfig = {
  isProduction: env === 'base',
  isDevelopment: env === 'development',

  // App
  app: {
    env: process.env.NODE_ENV,
    port: process.env.NODE_ENV === 'development' ? '1304' : '3000',
    feDomain: (() => {
      switch (process.env.NODE_ENV) {
        case 'development':
          return 'http://127.0.0.1:3011';
        case 'base':
          return 'https://x.glue.is';
        default:
          return `https://${process.env.NODE_ENV}.x.glue.is`;
      }
    })(),
    beDomain: (() => {
      switch (process.env.NODE_ENV) {
        case 'development':
          return 'http://127.0.0.1:1304';
      }
    })(),
  },
};
