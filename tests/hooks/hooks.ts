import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';
import { LoginPage } from '../../pages/LoginPages';


Before(async function (this: CustomWorld) {

    this.browser = await chromium.launch({
        headless: false
    });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

    this.loginPage = new LoginPage(this.page);

    await this.context.tracing.start({
        screenshots: true,
        snapshots: true,
        sources: true
    });
});


After(async function (this: CustomWorld, scenario) {

    if (scenario.result?.status === 'FAILED') {

        // Screenshot
        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(
            screenshot,
            'image/png'
        );

        // Save trace
        const tracePath = `test-results/${Date.now()}-trace.zip`;

        await this.context.tracing.stop({
            path: tracePath
        });

        console.log(`Trace saved: ${tracePath}`);

    } else {

        // Scenario passed - discard trace
        await this.context.tracing.stop();
    }

    await this.page.close();
    await this.context.close();
    await this.browser.close();
});