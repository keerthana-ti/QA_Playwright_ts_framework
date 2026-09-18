import { defineConfig } from '@playwright/test';

export default defineConfig({
    testDir: './tests/api',

    reporter: [
        ['list'],
        ['allure-playwright']
    ],

    timeout: 30000
});