
const { expect } = require('@playwright/test');

class Tax {

    constructor(page)  //if page is missing then there is no life for page defined in consructor

    {

        this.page = page;  //make it public , the page

        //Menu
        this.ProductsMenu = page.locator("div.nav_name_icon:has-text('Products')");
        this.tax = page.getByRole('link', { name: 'Tax' });

        //Create Tax
        this.AddButton = page.getByRole('button', { name: '+' });
        this.taxName = page.locator("[placeholder='Tax Name']");
        this.taxPercentage = page.locator("[placeholder='Tax Percentage']");
        this.saveButton = page.getByRole('button', { name: 'Save' });


        //  this.WaitcloseButton = page.locator('.close-button-popup').waitFor({ state: 'visible' });
        this.closeButton = page.locator('.close-button-popup');
        this.homeMenu = page.locator("div.nav_name_icon:has-text('Home')");

      //  this.idle = page.waitForLoadState('networkidle');
     //     await this.page.waitForLoadState('networkidle');
        this.successMessage = page.locator('.mat-simple-snack-bar-content');

        // Table
        this.tableHeader = page.locator('.mat-header-row');
        this.tableRows = page.locator('tbody tr.mat-row');
        this.tablebodyrows = page.locator("tbody tr.mat-row td.cdk-column-TaxName span");

    }

    async selectTaxMenu() {
        await this.ProductsMenu.click();
        await this.tax.click();
        //await this.idle();
        await this.page.waitForLoadState('networkidle');

    }

    async CreateTax(TaxName, TaxPercentage) {
        await this.AddButton.click();
        await this.taxName.fill(TaxName);
        await this.taxPercentage.fill(TaxPercentage);
        await this.saveButton.click();
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toContainText('Record has been saved successfully');
        console.log('Record has been saved successfully');


    }


    async closeTax() {
        await this.closeButton.waitFor({ state: 'visible' });
        await this.closeButton.click();
        //await this.idle;
        await this.page.waitForLoadState('networkidle');
          
    }

    async gotoHome() {
       
          await this.homeMenu.click();
    }

    //  EDIT TAX METHOD
    async editTax(EditTax) {

        await this.tableHeader.waitFor({ state: 'visible' });
        await expect(
            this.page.getByRole('checkbox').first()
        ).toBeVisible();

        await this.tablebodyrows.first().waitFor();

        //Get All Tax Names (For Debug)
        const TaxName = await this.tablebodyrows.allTextContents();
        console.log(TaxName);
//Count Total Rows
        const count = await this.tableRows.count();
        console.log("Total rows:", count);
//Loop Through All Rows
        for (let i = 0; i < count; i++) {
//Get Current Row
            const row = this.tableRows.nth(i);

            //Locate Tax Name Cell
            const taxCell = row.locator('td.cdk-column-TaxName span');
//Check If Tax Cell Exists
            if (await taxCell.count() === 0) {
                continue;
            }
//Get Tax Name Text
            const taxName = (await taxCell.first().innerText()).trim();
            console.log(`Row ${i} Tax Name:`, taxName);
//Compare With Required Tax Name AND CLICK Edit
            if (taxName === EditTax) {

                await row.locator('button.fa-pencil').click();
                console.log(`Clicked edit for ${EditTax}`);
                break;
            }
        }
    }
}

module.exports = { Tax };