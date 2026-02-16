const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../PageObject/POManager');
const testData = require('../../../test-data/WMS_Input.json');
const customAttributeData =
    require('../../../test-data/SiteSetup/CustomAttribute.json');
const orderTypeGroupData = require('../../../test-data/SiteSetup/OrderTypeGroup.json');

let context;
let page;
let poManager;
let siteSetup_CustomAttribute;
let siteSetup_OrderTypeGroup;

test.describe('Order Type Group Setup Flow', () => {

    test.describe.configure({ mode: 'serial' });

    // 🔐 LOGIN + NAVIGATION → RUNS ONCE
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.goTo(testData.url);
        await loginPage.validLogin(
            testData.LoginCredential.LoginId,
            testData.LoginCredential.LoginPassword
        );
        await loginPage.clickLoginButton();

        const homePage = poManager.getHomePage();
        await homePage.SelectSiteDropdown(testData.SiteSelection.SiteName);
        await homePage.Sitesetup_OrderTypeGroup_MenueSelection();

        siteSetup_OrderTypeGroup = poManager.getSiteSetup_OrderTypeGroup();
    });
    test('Add Order Type Group Values', async () => {

        await siteSetup_OrderTypeGroup.clickAddNewOrderTypeGroup();
        for (const orderTypeGroup of orderTypeGroupData.OrderTypeGroup) {
            await siteSetup_OrderTypeGroup.AddNewOrderTypeGroup_values(orderTypeGroup.Name, orderTypeGroup.Description, orderTypeGroup.Precedence);
            await siteSetup_OrderTypeGroup.clickSaveButton();
            
        }
        await siteSetup_OrderTypeGroup.closeOrderTypeGroupDialog();
    });

    // 🧹 CLEANUP
    test.afterAll(async () => {
        await context.close();
    });
});
