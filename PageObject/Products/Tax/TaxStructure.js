
const { expect } = require('@playwright/test');

class TaxStructure {

    constructor(page)  //if page is missing then there is no life for page defined in consructor

    {

        // Tax Structure Dialog
        this.AddButton = page.getByRole('button', { name: '+' });
        this.taxStructureDialog = page.locator('app-taxstructure-options');
        this.taxStructureContainer = page.locator('mat-dialog-container app-taxstructure-options');
        this.taxStructureAddBtn = page.locator('app-taxstructure-options button.btnAdd');

        // Structure Create Popup
        this.structureNameInput = page.locator("[placeholder='Structure Name']");
        this.structurePercentageInput = page.locator("[placeholder='Percentage']");
        this.taxStructureOverlay = page.locator('.cdk-overlay-pane.TaxStructure');
        this.taxStructureSaveBtn = this.taxStructureOverlay.getByRole('button', { name: 'Save' });
        this.taxStructureCloseBtn = this.taxStructureOverlay.locator('.close-button-popup');

        // Tax Set Dialog Close
        this.taxSetDialog = page.locator(
            '.mat-dialog-container:has(.title:has-text("Tax Set"))'
        );
        this.taxSetCloseBtn = this.taxSetDialog.locator('.close-button-popup');


    }

    async addTaxStructure(taxStructureName, taxStructurePercentage) {

        // Click + inside Tax Edit
        await this.AddButton.click();

        // Wait for structure dialog
        await expect(this.taxStructureDialog)
            .toContainText('No Records Found!', { timeout: 10000 });

        await expect(this.taxStructureContainer).toBeVisible();
        await expect(this.taxStructureAddBtn).toBeEnabled();

        // Click Add
        await this.taxStructureAddBtn.scrollIntoViewIfNeeded();
        await this.taxStructureAddBtn.click({ force: true });

        // Fill Tax Structure Details
        await expect(this.structureNameInput).toBeVisible();
        await this.structureNameInput.fill(taxStructureName);
        await this.structurePercentageInput.fill(taxStructurePercentage);

        // Save
        await this.taxStructureSaveBtn.click();
    }



    // Close Structure Popup
    async CloseTaxStructurePopup() {
        await this.taxStructureCloseBtn.waitFor({ state: 'visible' });
        await this.taxStructureCloseBtn.click();
    }


    // Close Tax Set Dialog
    async CloseTaxSet() {

        await this.taxSetCloseBtn.click();
    }

}

module.exports = { TaxStructure };