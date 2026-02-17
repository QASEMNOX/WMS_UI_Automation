const { expect } = require('@playwright/test');
class SegmentDefinitionMapping {
    constructor(page) {
        this.page = page;

        // Menus
        this.ProductsMenu = page.locator("div.nav_name_icon:has-text('Products')");
        this.ProductsSubMenu = page.getByRole('link', { name: 'Products' });
        this.SegmentDefinitionMappingMenu = page.getByRole('link', { name: 'Segment Definition Mapping', exact: true });

        // Form
        this.AddButton = page.getByRole('button', { name: '+' });
        this.DefinitionDropdown = page.getByRole('combobox', { name: 'Definition' });
        this.DataSourceTypeDropdown = page.getByRole('combobox', { name: 'Data Source Type' });


        // Actions
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.closeButton = page.locator('.close-button-popup');
        this.homeMenu = page.locator("div.nav_name_icon:has-text('Home')");

        //Success
        this.snackBarMessage = page.locator('.mat-simple-snack-bar-content');

    }

    async navigateToSegmentDefinitionMapping() {
        await this.ProductsMenu.click();
        await this.ProductsSubMenu.click();
        await this.SegmentDefinitionMappingMenu.click();
        await this.page.waitForLoadState('networkidle');
    }

    async createSegmentDefinitionMapping(segmentName, DataSourceType) {
        await this.AddButton.click();
        await this.page.waitForLoadState('networkidle');

        await this.DefinitionDropdown.click();


        await this.page.getByRole('option', { name: segmentName, exact: true }).click();
        await this.DataSourceTypeDropdown.click();
        await this.page.getByRole('option', { name: DataSourceType, exact: true }).click();
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

module.exports = { SegmentDefinitionMapping };
