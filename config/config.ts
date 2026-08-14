import 'dotenv/config';

export const config = {
    baseUrl: process.env.BASE_URL || '',
    username: process.env.CHAINEX_USERNAME || '',
    password: process.env.CHAINEX_PASSWORD || ''
};