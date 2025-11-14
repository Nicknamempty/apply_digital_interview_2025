import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import { getDatabaseConfig } from './database.config';

const ormConfig: TypeOrmModuleOptions = {
  ...getDatabaseConfig(),
  logger: 'file',
  migrationsTableName: process.env.SEEDING ? 'seeds' : 'migrations',
  entities: ['./src/**/entities/*{.js,.ts}'],
  migrations: [
    join(
      __dirname,
      '..',
      `database/${process.env.SEEDING ? 'seeds' : 'migrations'}/*{.ts,.js}`,
    ),
  ],
};

export default ormConfig;