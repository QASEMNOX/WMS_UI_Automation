const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../PageObject/POManager');
const testData = require('../../../test-data/WMS_Input.json');

test('WMS Login',async({page})=>{
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testData.url);
    await loginPage.validLogin(testData.LoginCredential.LoginId,testData.LoginCredential.LoginPassword);
    await loginPage.clickLoginButton();
})
