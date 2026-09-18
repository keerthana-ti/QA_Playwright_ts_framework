import 'dotenv/config';

export const config = {

    baseUrl: process.env.BASE_URL || '',
    apiBaseUrl: process.env.API_BASE_URL || '',
    username: process.env.CHAINEX_USERNAME || '',
    password: process.env.CHAINEX_PASSWORD || '',
    encryptedEmail: process.env.CHAINEX_ENCRYPTED_EMAIL || '',
    encryptedPassword: process.env.CHAINEX_ENCRYPTED_PASSWORD || ''

};