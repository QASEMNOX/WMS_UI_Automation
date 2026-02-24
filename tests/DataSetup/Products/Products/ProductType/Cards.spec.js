const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../../PageObject/POManager');
const testData = require('../../../../../test-data/WMS_Input.json');
const CardsData = require('../../../../../test-data/Products/Products/ProductType/Cards.json');

let context;
let page;
let poManager;
let Cards;
let loginPage;

test.describe('Products Products Menu Panel Flow', () => {
    test.describe.configure({ mode: 'serial' });
    // 🔐 LOGIN + NAVIGATION → RUNS ONCE
    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        page = await context.newPage();

        poManager = new POManager(page);

        loginPage = poManager.getLoginPage();
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
        await homePage.Products_Products_MenueSelection();
        await loginPage.waitForPageToBeReady();
        const products_Products_Page = poManager.getProducts_Products_Page();
        await products_Products_Page.clickCards();
        await loginPage.waitForPageToBeReady();
        Cards = poManager.getProducts_Products_cards();
    });
    // 🧱 STEP 1: CREATE Menu panel
    test('Create Cards Product', async () => {

        /* await Cards.AddNew_CardProduct();
         await loginPage.waitForPageToBeReady();
         await Cards.EnterDetails_CardProducts();//
         await Cards.Save_CardProducts();*/
        await loginPage.waitForPageToBeReady();
        await Cards.SelectProducts();
        await loginPage.waitForPageToBeReady();
      /*  await Cards.EnterDetails_CardProducts_Product();
        for (const card of CardsData.Cards) {
            const checkboxData = card.Cards_ProductPage.CheckBox;

            for (const [label, value] of Object.entries(checkboxData)) {
                await Cards.setCheckboxByLabel_Product(label, value);
            }
        }*/
       /* await Cards.AddNewMenuPanels_Product();
        await Cards.EnterMenuPanelDetail_Product();
        await Cards.SaveMenuPanels_Product();
        await Cards.CloseMenuPanel_Product();*/

        await Cards.Pricetab_CardProduct();
        await loginPage.waitForPageToBeReady();
    
        await Cards.EnterPriceDetails_Pricetab();


    });
});