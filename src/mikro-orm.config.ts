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
  seeder: {
    path: './dist/seeders', // path to the folder with seeders
    pathTs: './src/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
    defaultSeeder: 'DatabaseSeeder', // default seeder class name
    glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
    emit: 'ts', // seeder generation mode
    fileName: (className: string) => className, // seeder file naming convention
  },
};

export default config;
