import { join } from 'path';
import * as dotenv from 'dotenv';

dotenv.config();

export const getDatabaseConfig = (baseDir: string = __dirname) => ({
  type: 'postgres' as const,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT) || 5432,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  logging: process.env.DB_LOGGING === 'true' ? true : false,
});

