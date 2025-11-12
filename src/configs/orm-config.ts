import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: process.env.DB_LOGGING === 'true' ? true : false,
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