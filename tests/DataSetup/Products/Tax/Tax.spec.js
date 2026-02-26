const { test, expect } = require('@playwright/test');
//const { POManager } = require('../../../PageObject/POManager');

const { POManager } = require('../../../../PageObject/POManager');
//const testData = require('../test-data/OfferGroup.json');
const testData = require('../../../../test-data/WMS_Input.json');
const TaxData = require('../../../../test-data/Products/Tax/tax.json');

test.describe(' Create Multiple Tax', () => {

  let poManager;
  let page;

  const username = 'semnox';
  const password = 'semnoX!1';
  const site = 'ORIONSITEA';


  test.beforeAll(async ({ browser }) => {
    // launch new page only once
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

  for (const data of TaxData) {

    test(`Taxset for ${data.tax_Name}`, async ({ }) => {


      const Tax = poManager.getTaxPage();
      await Tax.selectTaxMenu();
      await Tax.CreateTax(data.tax_Name, data.taxPercentage);

      await Tax.closeTax();

      // Create Tax structure

      await Tax.editTax(data.EditTax);
      const TaxStructure = poManager.getTaxStructurePage();
      await TaxStructure.addTaxStructure(data.TaxStructureName, data.TaxStructurepercentage);
      await TaxStructure.CloseTaxStructurePopup();
      await TaxStructure.CloseTaxSet();

      await Tax.gotoHome();




    });
  }
  test.afterAll(async () => {
    await page.close();
  });

});














