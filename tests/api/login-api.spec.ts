import test, { request, expect } from '@playwright/test';
import { ApiClient } from '../../api/api-utilis/ApiClient';
import { LoginApi } from '../../api/clients/LoginApi';

test('Login API with valid credentials', async () => {

    const apiContext = await request.newContext();

    const apiClient = new ApiClient(apiContext);

    const loginApi = new LoginApi(apiClient);

    const response = await loginApi.login();

    expect(response.status()).toBe(200);

    await apiContext.dispose();
});