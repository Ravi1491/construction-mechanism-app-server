import 'dotenv/config';

const { NODE_ENV } = process.env;

const env = NODE_ENV || 'development';
const ACCESS_TOKEN = 'constructor_mechanism_jwt_key';

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

  // Database
  db: {
    dbDialect: process.env.DB_DIALECT || 'postgres',
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
    port: process.env.DB_PORT,
  },

  jwt: {
    serverToServerAuthSecret:
      process.env.SERVER_AUTH_JWT_SECRET || 'server-secret',
    secret: process.env.JWT_SECRET || 'constructor-mechanism-secret',
    expiresIn: '24h',
    issuer: 'constructor-mechanism',
    cookieKey:
      process.env.NODE_ENV === 'base'
        ? ACCESS_TOKEN
        : `${process.env.NODE_ENV}_${ACCESS_TOKEN}`,
  },
};
