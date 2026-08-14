import { World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPages';

export class CustomWorld extends World {

    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    loginPage!: LoginPage;

    constructor(options: IWorldOptions) {
        super(options);
    }
}