const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../../PageObject/POManager');
const testData = require('../../../../../test-data/WMS_Input.json');
const ProductMenuData = require('../../../../../test-data/Products/Products/ProductSetup/ProductMenu.json');

let context;
let page;
let poManager;
let ProductMenu;

test.describe('Products Products Menu  Flow', () => {
    test.describe.configure({ mode: 'serial' });
    // 🔐 LOGIN + NAVIGATION → RUNS ONCE
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();
        poManager = new POManager(page);
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo(testData.url);
        await loginPage.waitForPageToBeReady();
        await loginPage.validLogin(
            testData.LoginCredential.LoginId,
            testData.LoginCredential.LoginPassword
        );
        await loginPage.clickLoginButton();
        await loginPage.waitForPageToBeReady();
        const homePage = poManager.getHomePage();
        await homePage.SelectSiteDropdown(testData.SiteSelection.SiteName);
        await loginPage.waitForPageToBeReady();
        await homePage.MenueSelection();
        await loginPage.waitForPageToBeReady();
        const products_Products_Page=poManager.getProducts_Products_Page();
        await products_Products_Page.clickProductMenu();
        ProductMenu = poManager.getProducts_Products_ProductMenu();
    });
    // 🧱 STEP 1: CREATE Product Menu
    test('Create a Product Menu', async () => {
        await ProductMenu.clickAddNewProductMenu();
        for (const productMenu of ProductMenuData.ProductMenus) {
            await ProductMenu.enterProductMenuDetails(
                productMenu.Name,
                productMenu.Type,
                productMenu.Description
            );
            await ProductMenu.clickSaveButton();
        }
    });
});