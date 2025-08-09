import { config as dotenvConfig } from 'dotenv';
import { join } from 'path';

dotenvConfig({ path: join(process.cwd(), '.env') });

export const baseConfig: IBaseConfig = {
    WEB_URL: process.env.WEB_URL!,
    USER_EMAIL: process.env.USER_EMAIL!,
    USER_PASSWORD: process.env.USER_PASSWORD!,
    USER_NAME: process.env.USER_NAME!,
};

interface IBaseConfig {
    WEB_URL: string;
    USER_EMAIL: string;
    USER_PASSWORD: string;
    USER_NAME: string;
}
