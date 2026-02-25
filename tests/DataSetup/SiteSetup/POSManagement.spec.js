const { test, expect } = require('@playwright/test');

const { POManager } = require('../../../PageObject/POManager');

const testData = require('../../../test-data/WMS_Input.json');
const POSData = require('../../../test-data/SiteSetup/POSData.json');

test.describe('Create Multiple POS', () => {

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

for (const data of POSData) {
    test(`POSManagement for ${data.posName}`, async ({  }) => {

    

        //const sitedropdown = page.locator("div.mat-select-value")
      
        

        //POS Machines
        const posPage = poManager.getPOSPage();
        await posPage.selectSitesetup();
        await posPage.selectPOSManagement();
        //await posPage.createPOSMachine(posName,computerName);
        await posPage.createPOSMachine(data.posName, data.computerName);
        await posPage.GoHome();


    });
}

test.afterAll(async () => {
        await page.close();
    });

});








