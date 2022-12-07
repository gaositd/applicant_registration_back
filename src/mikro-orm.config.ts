import { Options } from '@mikro-orm/postgresql';
import { User } from './models/user';

const config: Options = {
  type: 'postgresql',
  entities: [User],
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  dbName: 'prescriptiondb',
  debug: process.env.NODE_ENV !== 'production',
  migrations: {
    path: './src/migrations',
    transactional: true,
    emit: 'ts',
  },
};

export default config;
