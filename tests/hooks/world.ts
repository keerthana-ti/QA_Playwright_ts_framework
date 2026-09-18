import { World, IWorldOptions } from '@cucumber/cucumber';
import { APIRequestContext, Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPages';
import { ApiClient } from '../../api/api-utilis/ApiClient';
import { LoginApi } from '../../api/clients/LoginApi';

export class CustomWorld extends World {

    browser!: Browser;
    context!: BrowserContext;
    page!: Page;
    apiContext!: APIRequestContext;

    loginPage!: LoginPage;
    apiClient!: ApiClient;
    loginApi!: LoginApi;

    constructor(options: IWorldOptions) {
        super(options);
    }
}