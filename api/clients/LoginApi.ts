import { APIResponse } from '@playwright/test';
import { ApiClient } from '../api-utilis/ApiClient';
import { config } from '../../config/config';

export class LoginApi {

    constructor(
        private readonly apiClient: ApiClient
    ) {}
    
    async login(): Promise<APIResponse> {

        return await this.apiClient.post(
            '/admin/api/v1/auth/login',
            {
                email: config.encryptedEmail,
                password: config.encryptedPassword
            }
        );
    }
}