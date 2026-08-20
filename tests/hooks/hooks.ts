import { Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { readFile } from 'fs/promises';
import { CustomWorld } from './world';
import { LoginPage } from '../../pages/LoginPages';

setDefaultTimeout(10000);

Before(async function (this: CustomWorld) {

    this.browser = await chromium.launch({
        headless: true
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

        // Capture screenshot
        const screenshot = await this.page.screenshot({
            fullPage: true
        });

        await this.attach(
            screenshot,
            'image/png'
        );

        // Create a meaningful trace filename
        const scenarioName = scenario.pickle.name
            .replace(/[^a-zA-Z0-9-_]/g, '_');

        const timestamp = new Date()
            .toISOString()
            .replace(/[:.]/g, '-');

        const tracePath =
            `test-results/${scenarioName}-${timestamp}-playwright-trace.zip`;

        // Stop tracing and save trace
        await this.context.tracing.stop({
            path: tracePath
        });

        // Read the actual ZIP file
        const trace = await readFile(tracePath);

        // Attach actual trace ZIP to Allure
        await this.attach(
            trace,
            'application/zip'
        );

        console.log(`Trace saved and attached: ${tracePath}`);

    } else {

        // Scenario passed - discard trace
        await this.context.tracing.stop();
    }

    await this.page.close();
    await this.context.close();
    await this.browser.close();
});