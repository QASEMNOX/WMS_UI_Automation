const { expect } = require('@playwright/test');

class OrderType {
    constructor(page) {
        this.page = page;
        this.dialog = page.locator('.mat-dialog-container');

        this.AddNewOrderType = this.page.getByRole('button', { name: '+' });
        this.Name = this.dialog.getByRole('textbox', { name: 'Name' });
        this.description = this.dialog.getByRole('textbox', { name: 'Description' });

        this.saveButton = this.dialog.getByRole('button', { name: 'Save save' });
        this.CloseButton = this.dialog.getByText('X', { exact: true })
        this.recordSavedMessage = this.page.getByText('Record has been saved');
        this.SuccessfulySavedMessage = this.page.locator('.mat-snack-bar-container');

    }
    async ClickOnAddNewOrderType()
    {
        await this.AddNewOrderType.click();
    }
    async EnterOrderTypeValues(name, description) {
        await this.dialog.waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        console.log("1111111111");
        await this.Name.fill(name);
         console.log("1111111111");
        await this.description.fill(description);
         console.log("1111111111");
    }
    async clickSaveButton() {
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
module.exports = { OrderType };
