const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../../PageObject/POManager');
//const testData = require('../test-data/OfferGroup.json');
const testData = require('../../../../../test-data/WMS_Input.json');
const SegmentDefinitionData = require('../../../../../test-data/Products/Products/ProductSetup/SegmentDefinitionData.json');

//const testData = require('../../../test-data/Products/ProductSetup/SegmentDefinitionData.json');

test.describe(' Segment Definition - Create Multiple Segments', () => {

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

for (const data of SegmentDefinitionData) {
 
  test(`Segment for ${data.segmentName}`, async ({  }) => {

    
const segmentDefinition = poManager.getSegmentDefinitionPage();
await segmentDefinition.navigateToSegmentDefinition();
await segmentDefinition.createSegmentDefinition(data.segmentName, data.SequenceOrder, data.isMandatory, data.applicableEntity);
await segmentDefinition.verifySuccessMessage();
await segmentDefinition.closeAndGoHome();
//await page.getByText('IsUpsell').click();

/*await expect(
  page.locator('snack-bar-container')
).toContainText('Record has been saved successfully');
*/

//await segmentDefinition.closeOfferGroup();

  });
}
test.afterAll(async () => {
        await page.close();
    });

});














