const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../../PageObject/POManager');
//const testData = require('../test-data/OfferGroup.json');
const testData = require('../../../../../test-data/WMS_Input.json');
const SaleOfferGroupData = require('../../../../../test-data/Products/Products/ProductSetup/OfferGroup.json');


test.describe(' Offer Group - Create Multiple Sale Offer Group', () => {

  let poManager;
  let page;

  const username = 'semnox';
  const password = 'semnoX!1';
  const site = 'ORIONSITEA';


  test.beforeAll(async ({ browser }) => {
    // launch new page only once
    /*   page = await browser.newPage();
       poManager = new POManager(page);

       const pageLogin = poManager.getLoginPage();
       await pageLogin.goTo();
       await pageLogin.validLogin(username, password);
       await pageLogin.selectSite(site); */

    page = await browser.newPage();
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
   /* await loginPage.waitForPageToBeReady();
    await homePage.MenueSelection();
    await loginPage.waitForPageToBeReady();
    */

  });

  for (const data of SaleOfferGroupData) {

    test(`OfferGroup for ${data.OfferGroupName}`, async ({ }) => {


      const offerGroup = poManager.getOfferGroupPage();
      await offerGroup.selectProductsSubMenu();

      await offerGroup.selectOfferGroup();
      await offerGroup.createOfferGroup(data.OfferGroupName, data.isUpsell);
      //await page.getByText('IsUpsell').click();

      /*await expect(
        page.locator('snack-bar-container')
      ).toContainText('Record has been saved successfully');
      */

      await offerGroup.closeOfferGroup();

    });
  }
  test.afterAll(async () => {
    await page.close();
  });

});














