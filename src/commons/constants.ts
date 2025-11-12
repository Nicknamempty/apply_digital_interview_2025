import { config } from 'dotenv';

config();

// CDN constants
export const CDN_CONTENT_TYPE = process.env.CDN_CONTENT_TYPE;
export const CDN_SPACE_ID = process.env.CDN_SPACE_ID;
export const CDN_ACCESS_TOKEN = process.env.CDN_ACCESS_TOKEN;
export const CDN_ENVIROMENT_ID = process.env.CDN_ENVIROMENT_ID;
export const CDN_BASE_URL = process.env.CDN_BASE_URL;
export const CDN_FULL_URL = CDN_BASE_URL + '/spaces/' + CDN_SPACE_ID + '/environments/' + CDN_ENVIROMENT_ID + '/entries?access_token=' + CDN_ACCESS_TOKEN + '&content_type=' + CDN_CONTENT_TYPE;

// Database constants
export const TYPEORM_DATABASE = process.env.TYPEORM_DATABASE;
export const TYPEORM_USERNAME = process.env.TYPEORM_USERNAME;
export const TYPEORM_PASSWORD = process.env.TYPEORM_PASSWORD;
export const TYPEORM_PORT = process.env.TYPEORM_PORT;
export const TYPEORM_HOST = process.env.TYPEORM_HOST;