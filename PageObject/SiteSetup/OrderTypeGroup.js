const { expect } = require('@playwright/test');

class OrderTypeGroup {
    constructor(page) {
        this.page = page;

        this.AddNewOrderTypeGroup = page.locator(".btnAdd");
        this.dialog = page.locator('.mat-dialog-container');
        this.typeOption = (type) => this.page.getByRole('option', { name: new RegExp(`^${type}$`, 'i') });

        this.saveButton = this.dialog.getByRole('button', { name: 'Save' });
        this.SuccessfulySavedMessage = this.page.locator('.mat-snack-bar-container');

        this.Name = this.dialog.getByRole('textbox', { name: 'Name' });
        this.Description = this.dialog.getByRole('textbox', { name: 'Description' });
        this.Precedence = this.dialog.getByRole('textbox', { name: 'Precedence' });
        this.CloseButton = this.dialog.getByRole('button', { name: 'Close' });
        this.recordSavedMessage = this.page.getByText('Record has been saved');
    }

    async clickAddNewOrderTypeGroup() {
        await this.AddNewOrderTypeGroup.click();
    }
    async AddNewOrderTypeGroup_values(name, description, precedence) {
        await this.Name.fill(name);
        await this.Description.fill(description);
        await this.Precedence.fill(precedence);
    }
    async clickSaveButton() {
        // expect(this.saveButton).toBeEnabled();
        await this.saveButton.click();
        await expect(this.SuccessfulySavedMessage).toBeVisible();
        const messageText = (await this.SuccessfulySavedMessage.innerText())?.trim();
        console.log('Popup message:', messageText);
        if (/record has been saved successfully/i.test(messageText)) {
            console.log(`✅ Order Type Group "${this.Name}" created successfully`);
        }
        else if (/unique order type group names/i.test(messageText)) {
            console.log(`❌ Order Type Group Creation Failed for: "${this.Name}"`);
            console.log(`⚠️ Message: ${messageText}`);
        }
        else {
            console.log(`❓ Unknown response for Order Type Group "${this.Name}"`);
            console.log(`📩 Message: ${messageText}`);
        }
        await this.recordSavedMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    }
    async closeOrderTypeGroupDialog() {
        await this.CloseButton.click();
    }
}
module.exports = { OrderTypeGroup };
