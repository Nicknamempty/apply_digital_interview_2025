import { DataSource } from 'typeorm';
import { join } from 'path';
import { getDatabaseConfig } from './configs/database.config';

const dbConfig = getDatabaseConfig();
const host = dbConfig.host === 'postgres' ? 'localhost' : dbConfig.host;
export const AppDataSource = new DataSource({
  ...dbConfig,
  host,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  migrations: [join(__dirname, 'database', 'migrations', '*.{ts,js}')],
  migrationsTableName: 'migrations',
});

