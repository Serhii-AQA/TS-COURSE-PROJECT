import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

export const WEB_URL: string = process.env.WEB_URL!;
export const API_BASE_URL: string = process.env.API_BASE_URL!;
export const USER_EMAIL: string = process.env.USER_EMAIL!;
export const USER_PASSWORD: string = process.env.USER_PASSWORD!;
export const USER_NAME: string = process.env.USER_NAME!;
