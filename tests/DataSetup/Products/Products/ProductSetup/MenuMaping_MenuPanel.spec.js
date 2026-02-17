const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../../PageObject/POManager');
const testData = require('../../../../../test-data/WMS_Input.json');
const MenuPanelData = require('../../../../../test-data/Products/Products/ProductSetup/MenuPanel.json');
const MenuMapping_MenuPanelData = require('../../../../../test-data/Products/Products/ProductSetup/MenuMapping_MenuPanel.json');

let context;
let page;
let poManager;
let loginPage;
let MenuPanel;

test.describe('Products Products Menu Panel Flow', () => {
    test.describe.configure({ mode: 'serial' });
    // 🔐 LOGIN + NAVIGATION → RUNS ONCE
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        poManager = new POManager(page);

        loginPage = poManager.getLoginPage();
       // await loginPage.waitForPageToBeReady();
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
        await products_Products_Page.clickPanels();
        await loginPage.waitForPageToBeReady();
        MenuPanel =poManager.getProducts_Products_MenuPanel();
    });
    // 🧱 STEP 1: CREATE Menu panel
    test('Add  panel to existing menu', async () => {

        for(const menuMapping_MenuPanel of MenuMapping_MenuPanelData.MenuMapping_MenuPanel){
            await MenuPanel.searchAndSelectPanel(menuMapping_MenuPanel.PanelName);
            await MenuPanel.searchAndSelectPanel(menuMapping_MenuPanel.PanelName);
            await MenuPanel.ClickOnActionsButtonForMenuPanel();
            await loginPage.waitForPageToBeReady();
            await MenuPanel.ClickOnMenuMappingButton();
            await loginPage.waitForPageToBeReady();
            await MenuPanel.ClickOnAddNewMenuMapping();
            await loginPage.waitForPageToBeReady();
            await MenuPanel.SearchAndSelectMenuInDropdown(menuMapping_MenuPanel.MenuName);
            await MenuPanel.clickMenuMappingSaveButton();
            await loginPage.waitForPageToBeReady();
            await MenuPanel.clickMenuMappingCloseButton();
            await MenuPanel.closeMenuPanelDialog();
            await loginPage.waitForPageToBeReady();
        }
    });
});