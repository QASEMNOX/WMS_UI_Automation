const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../PageObject/POManager');
const testData = require('../../../test-data/WMS_Input.json');
const orderTypeData = require('../../../test-data/SiteSetup/OrderType.json');

let context;
let page;
let poManager;
let OrderType;
let loginPage;
test.describe('Order Type Setup Flow', () => {

    test.describe.configure({ mode: 'serial' });

    // 🔐 LOGIN + NAVIGATION → RUNS ONCE
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        poManager = new POManager(page);

        loginPage = poManager.getLoginPage();
        await loginPage.goTo(testData.url);
        await loginPage.validLogin(
            testData.LoginCredential.LoginId,
            testData.LoginCredential.LoginPassword
        );
        await loginPage.clickLoginButton();

        const homePage = poManager.getHomePage();
        await homePage.SelectSiteDropdown(testData.SiteSelection.SiteName);
        await homePage.Sitesetup_OrderType_MenuSelection();

        OrderType = poManager.getSiteSetup_OrderType();
        await loginPage.waitForPageToBeReady();
    });
  /* test('Add Order Type Group Values', async () => {
        await OrderType.AddNew_OrderType();
        for (const orderTypeItem of orderTypeData.OrderType) {
            await OrderType.EnterDetails_OrderType(
                orderTypeItem.Name,
                orderTypeItem.Description
            );
            await OrderType.Save_OrderType();
        }
        await OrderType.Close_OrderType();
    });*/
        test('Add Order Type Group Mapping', async () => {
            
        await OrderType.Search_OrderType("QAOrderType1");
        await OrderType.Search_OrderType("QAOrderType1");
        await loginPage.waitForPageToBeReady();
        await OrderType.SelectCheckbox_OrderType("QAOrderType1");
        await OrderType.SelectMapButton_OrderType();
        
    });

    // 🧹 CLEANUP
    test.afterAll(async () => {
        await context.close();
    });
});
