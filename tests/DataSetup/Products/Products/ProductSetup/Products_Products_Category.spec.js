const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../../../PageObject/POManager');
const testData = require('../../../../../test-data/WMS_Input.json');

test('Products Products Category',async({page})=>{
    const poManager = new POManager(page);

    const loginPage = poManager.getLoginPage();
    await loginPage.goTo(testData.url);
    await loginPage.validLogin(testData.LoginCredential.LoginId,testData.LoginCredential.LoginPassword);
    await loginPage.clickLoginButton();

    const homePage = poManager.getHomePage();
    await homePage.SelectSiteDropdown(testData.SiteSelection.SiteName);
    await homePage.MenueSelection();

    const products_Products_Page=poManager.getProducts_Products_Page();
    await products_Products_Page.clickProductCategory();
    
    const products_Products_ProductCategory=poManager.getProducts_Products_ProductCategory();
    await products_Products_ProductCategory.clickAddNewProductCategory();
    await products_Products_ProductCategory.enterCategoryDetails("2222");
    await products_Products_ProductCategory.clickSaveButton();
})
