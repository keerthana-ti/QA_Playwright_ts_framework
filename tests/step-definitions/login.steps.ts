import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../hooks/world';
import { config } from '../../config/config';
import loginData  from '../../test-data/login-data.json';

Given('I am on the Chainex login page', async function (this: CustomWorld) {
    await this.loginPage.open();
});

When('I enter valid username and password', async function (this: CustomWorld) {
    await this.loginPage.enterUsername(loginData.validUser.username);
    await this.loginPage.enterPassword(config.password);
});

When('I click the login button', async function (this: CustomWorld) {
    await this.loginPage.clickLogin();
});

Then('I should be redirected to the OTP page', async function (this: CustomWorld) {
    await this.loginPage.verifyOtpPageDisplayed();
});