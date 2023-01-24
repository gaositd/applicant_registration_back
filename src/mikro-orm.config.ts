import { Options } from '@mikro-orm/postgresql';
import { User } from './models/user';
require('dotenv').config();

const config: Options = {
  type: 'postgresql',
  entities: [User],
  port: 5432,
  clientUrl: process.env.DB_CONN_STRING,
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './src/migrations',
    transactional: true,
    emit: 'ts',
  },
};

export default config;
