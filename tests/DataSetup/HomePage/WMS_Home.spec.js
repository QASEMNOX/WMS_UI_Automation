const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../PageObject/POManager');
const testData = require('../../../test-data/WMS_Input.json');
const menuName = Object.keys(testData.MenuItem)[1];
const subMenuName = testData.MenuItem[menuName][0];
test('WMS Login & site selection',async({page})=>{
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testData.url);
    await loginPage.validLogin(testData.LoginCredential.LoginId,testData.LoginCredential.LoginPassword);
    await loginPage.clickLoginButton();

    const homePage = poManager.getHomePage();
    await homePage.SelectSiteDropdown(testData.SiteSelection.SiteName);
    await homePage.MenueSelection();
    //await homePage.SubMenueSelection(subMenuName);
})
