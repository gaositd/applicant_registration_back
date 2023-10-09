import { Options } from '@mikro-orm/postgresql';
import { Configs } from './models/configs';
import { Documents_Observaciones } from './models/documents_observaciones';
import { User } from './models/user';
import { UserDocuments } from './models/user_documents';
require('dotenv').config();

const config: Options = {
  type: 'postgresql',
  entities: ['dist/models/*.js'],
  entitiesTs: ['src/models/*.ts'],
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
