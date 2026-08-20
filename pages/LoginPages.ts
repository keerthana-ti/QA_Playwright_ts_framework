import { Page, Locator, expect } from '@playwright/test';
import { config } from '../config/config';

export class LoginPage {

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly otpPageElement: Locator;

    constructor(private page: Page) {

        this.usernameInput = page.getByTestId('components-auth-auth-login-email');
        this.passwordInput = page.getByTestId('components-auth-password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.otpPageElement = page.getByTestId('components-auth-auth-login-otp');
    }

    async open() {
        await this.page.goto(`${config.baseUrl}/authLogin`);
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
    }

    async clickLogin() {
    await this.loginButton.click();
    }

   async verifyOtpPageDisplayed() {
    await expect(this.otpPageElement).toBeVisible({
        timeout: 10000
    });
}
}