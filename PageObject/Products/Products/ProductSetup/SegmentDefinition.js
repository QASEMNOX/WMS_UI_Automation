const { expect } = require('@playwright/test');

class SegmentDefinition {
  constructor(page) {
    this.page = page;

    // Menus
    this.ProductsMenu = page.locator("div.nav_name_icon:has-text('Products')");
    this.ProductsSubMenu = page.getByRole('link', { name: 'Products' });
    this.SegmentDefinitionMenu = page.getByRole('link', { name: 'Segment Definition', exact: true });

    // Form
    this.AddButton = page.getByRole('button', { name: '+' });
    this.SegmentNameInput = page.locator("[placeholder='Name']");
    this.ApplicableEntityDropdown = page.getByRole('combobox', { name: 'Applicable Entity' });
    this.SequenceOrderInput = page.locator("[placeholder='Sequence Order']");
    this.MandatoryCheckbox = page
      .locator('mat-checkbox', { hasText: 'Mandatory?' })
      .locator('.mat-checkbox-inner-container');

    // Actions
    this.saveButton = page.getByRole('button', { name: 'Save' });
    this.closeButton = page.locator('.close-button-popup');
    this.homeMenu = page.locator("div.nav_name_icon:has-text('Home')");

    //Success

    //this.successMessage = 
    this.snackBarMessage = page.locator('.mat-simple-snack-bar-content');
     
  }

  async navigateToSegmentDefinition() {
    await this.ProductsMenu.click();
    await this.ProductsSubMenu.click();
    await this.SegmentDefinitionMenu.click();
    await this.page.waitForLoadState('networkidle');
  }

  async createSegmentDefinition(segmentName, SequenceOrder, isMandatory, applicableEntity) {
    await this.AddButton.click();
    await this.page.waitForLoadState('networkidle');

    await this.SegmentNameInput.fill(segmentName);

    await this.ApplicableEntityDropdown.click();
    await this.page.getByRole('option', { name: applicableEntity,   exact: true  }).click();

    await this.SequenceOrderInput.fill(String(SequenceOrder));

    if (isMandatory === 'Y' || isMandatory === true) {
      await this.MandatoryCheckbox.click();
    }

    await this.saveButton.click();
  }

  async closeAndGoHome() {
    await this.closeButton.click();
    await this.homeMenu.click();
  }

  async verifySuccessMessage() {
    await expect(this.snackBarMessage).toBeVisible();
    await expect(this.snackBarMessage).toContainText('Record has been saved successfully');
    console.log('Record has been saved successfully');
  }
}

 

module.exports = { SegmentDefinition };
