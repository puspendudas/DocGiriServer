import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });
const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;
export const CREDENTIALS = process.env.CREDENTIALS === 'true';
export const DB_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_DATABASE}`;
export const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN_LOCAL, ORIGIN_LIVE, ORIGIN_SATTA, ORIGIN_LOCAL_1, ORIGIN_LOCAL_2, ORIGIN_SATTA_1, ORIGIN_LIVE_1 } = process.env;
