import { APIRequestContext, APIResponse } from '@playwright/test';
import { config } from '../../config/config';

export class ApiClient {

    constructor(
        private readonly apiContext: APIRequestContext
    ) {}

    private getUrl(endpoint: string): string {
        return `${config.apiBaseUrl}${endpoint}`;
    }

    async get(
        endpoint: string
    ): Promise<APIResponse> {
        return await this.apiContext.get(this.getUrl(endpoint));
    }

    async post(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {
        return await this.apiContext.post(this.getUrl(endpoint), {
            data
        });
    }

    async put(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {
        return await this.apiContext.put(this.getUrl(endpoint), {
            data
        });
    }

    async patch(
        endpoint: string,
        data?: object
    ): Promise<APIResponse> {
        return await this.apiContext.patch(this.getUrl(endpoint), {
            data
        });
    }

    async delete(
        endpoint: string
    ): Promise<APIResponse> {
        return await this.apiContext.delete(this.getUrl(endpoint));
    }
}