const { test, expect } = require('@playwright/test');
const { POManager } = require('../../../PageObject/POManager');
const testData = require('../../../test-data/WMS_Input.json');
const customAttributeData =
    require('../../../test-data/SiteSetup/CustomAttribute.json');

let context;
let page;
let poManager;
let siteSetup_CustomAttribute;

test.describe('Custom Attribute Setup Flow', () => {

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
        await homePage.Sitesetup_CustomAttribute_MenueSelection();

        siteSetup_CustomAttribute =
            poManager.getSiteSetup_CustomAttribute();
    });
    /*
        // 🧱 STEP 1: CREATE CUSTOM ATTRIBUTES (NO VALUES)
        test('Create Custom Attributes', async () => {
    
            for (const attribute of customAttributeData.CustomAttributes) {
    
                await siteSetup_CustomAttribute.clickAddNewCustomerAttribute();
                await siteSetup_CustomAttribute.enterAttributeName(attribute.Name);
                await siteSetup_CustomAttribute.selectType(attribute.Type);
                await siteSetup_CustomAttribute.selectApplicability(attribute.Applicability);
                await siteSetup_CustomAttribute.clickSaveButton();
    
            }
        });*/

    // 🧩 STEP 2: ADD ATTRIBUTE VALUES (ONLY LIST TYPE)
    test('Add Custom Attribute Values', async () => {
        /*
                for (const attribute of customAttributeData.CustomAttributes) {
        
                    if (
                        attribute.Type !== 'LIST' ||
                        !attribute.CustomAttributeValueListDTOList.length
                    ) {
                        continue;
                    }
                    console.log(`Adding values for Custom Attribute: ${attribute.Name}`);
                    await siteSetup_CustomAttribute.searchCustomAttribute(attribute.Name);
                    
                    await siteSetup_CustomAttribute.selectLastCustomAttributeCheckbox();
                    //await siteSetup_CustomAttribute.selectCustomAttributeCheckbox(attribute.Name);
                    await siteSetup_CustomAttribute.ClickonAddCustomAttributeValuesButton();
        
                    await siteSetup_CustomAttribute.addListValues(
                        attribute.CustomAttributeValueListDTOList
                    );
        
                    await siteSetup_CustomAttribute.closecustomAttributeDialog();
                }*/

        for (const attribute of customAttributeData.CustomAttributes) {

            console.log(`Adding values for Custom Attribute: ${attribute.Name}`);

            if (attribute.CustomAttributeValueListDTOList.length === 0) {
                console.log(`No values to add for ${attribute.Name}`);
                continue;
            }

            for (const valueObj of attribute.CustomAttributeValueListDTOList) {

                const value = valueObj.Value;

                console.log(`Adding value: ${value}`);

                // Search attribute
                await siteSetup_CustomAttribute.searchCustomAttribute(attribute.Name);

                await siteSetup_CustomAttribute.selectLastCustomAttributeCheckbox();

                // Click Add Value
                await siteSetup_CustomAttribute.ClickonAddCustomAttributeValuesButton();

                // Fill value
                await siteSetup_CustomAttribute.addCustomerAttributeListValues(value);

                // Save
                await siteSetup_CustomAttribute.clickCustomAttributeValueSaveButton(value);

                console.log(`✅ Custom Attribute Value "${value}" added successfully`);
            }
        }

    });

    // 🧹 CLEANUP
    test.afterAll(async () => {
        await context.close();
    });
});
