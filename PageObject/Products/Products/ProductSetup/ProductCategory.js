const { expect } = require('@playwright/test');

class ProductCategory {
    constructor(page) {
        this.page = page;

        this.AddNewProductCategory = page.locator(".btnAdd");

        this.dialog = page.locator('.mat-dialog-container');

        this.categoryId = this.dialog.getByLabel('Category Id');
        this.categoryName = this.dialog.getByLabel(/name/i);

        this.parentCategory = this.dialog.getByLabel('Parent Category');
        this.activeCheckbox = this.dialog.getByRole('checkbox', { name: 'Active' });
        this.saveButton = this.dialog.getByRole('button', { name: 'Save' });

        this.SuccessfulySavedMessage = this.page.locator('.mat-snack-bar-container');
    }
    async clickAddNewProductCategory() {
        await expect(this.AddNewProductCategory).toBeEnabled();
        await this.AddNewProductCategory.click();
       // await expect(this.dialog).toBeVisible();
    }
    async enterCategoryDetails(categoryName) {
        await this.page.waitForLoadState('networkidle');
        this.categoryNameValue = categoryName;
        await expect(this.categoryName).toBeVisible();
        await this.categoryName.fill(categoryName, { delay: 500 });
    }
    async clickSaveButton() {
        await expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();

        await expect(this.SuccessfulySavedMessage).toBeVisible();
        const messageText = (await this.SuccessfulySavedMessage.innerText())?.trim();
        console.log('Popup message:', messageText);
        if (/record has been saved successfully/i.test(messageText)) {
            console.log(`✅ Product Category "${this.categoryNameValue}" created successfully`);
        }
        else if (/unique product category names/i.test(messageText)) {
            console.log(`❌ Product Category Creation Failed for: "${this.categoryNameValue}"`);
            console.log(`⚠️ Message: ${messageText}`);
        }
        else {
            console.log(`❓ Unknown response for Product Category "${this.categoryNameValue}"`);
            console.log(`📩 Message: ${messageText}`);
        }
    }

}
module.exports = { ProductCategory };
