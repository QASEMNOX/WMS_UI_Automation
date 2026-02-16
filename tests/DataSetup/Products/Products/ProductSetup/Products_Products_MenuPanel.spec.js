const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../../PageObject/POManager');
const testData = require('../../../../../test-data/WMS_Input.json');
const MenuPanelData = require('../../../../../test-data/Products/Products/ProductSetup/MenuPanel.json');

let context;
let page;
let poManager;
let products_Products_MenuPanel;

test.describe('Products Products Menu Panel Flow', () => {
    test.describe.configure({ mode: 'serial' });
    // 🔐 LOGIN + NAVIGATION → RUNS ONCE
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        poManager = new POManager(page);

        const loginPage = poManager.getLoginPage();
        await loginPage.waitForPageToBeReady();
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
        await homePage.MenueSelection();
        await loginPage.waitForPageToBeReady();
        const products_Products_Page=poManager.getProducts_Products_Page();
        await products_Products_Page.clickPanels();
        await loginPage.waitForPageToBeReady();
        products_Products_MenuPanel =
            poManager.getProducts_Products_MenuPanel();
    });
    // 🧱 STEP 1: CREATE Menu panel
    test('Create Menu panel', async () => {

        await products_Products_MenuPanel.clickAddNewMenuPanel();
        for (const menuPanel of MenuPanelData.MenuPanels) {
            await products_Products_MenuPanel.enterMenuDetails(
                menuPanel.Name,
                menuPanel.RowCount,
                menuPanel.ColumnCount,
                menuPanel.DisplayOrder,
                menuPanel.CellMarginTop,
                menuPanel.CellMarginBottom,
                menuPanel.CellMarginLeft,
                menuPanel.CellMarginRight
            );
            await products_Products_MenuPanel.clickSaveButton();
        }
        await products_Products_MenuPanel.closeMenuPanelDialog();
    });
});