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

        this.searchOrderType = this.page.locator('.card.mt-3.mb-3').getByRole('textbox', { name: 'Search' });
        this.firstRow = this.page.locator('table tbody tr').first();
        this.checkbox_OrderType = this.firstRow.locator('input[type="checkbox"]');
        this.OrderTypeGroupMapButton = this.page.locator('button:has-text("Map Order Type")');

    }
    async AddNew_OrderType() {
        await this.AddNewOrderType.click();
    }
    async EnterDetails_OrderType(name, description) {
        await this.dialog.waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
        await this.Name.fill(name);
        await this.description.fill(description);
    }
    async Save_OrderType() {
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
        await this.recordSavedMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });
    }
    async Close_OrderType() {
        await this.CloseButton.click();
    }

    async Search_OrderType(Name) {
        await this.page.waitForLoadState('networkidle');
        await this.searchOrderType.waitFor({ state: 'visible', timeout: 10000 }).catch(() => { });
        await this.searchOrderType.fill(Name, { delay: 500 });
    }

    // 2️⃣ Wait for search result row to appear
   /* async SelectCheckbox_OrderType() {

        await this.firstRow.waitFor({ state: 'visible' });

        // 3️⃣ Click checkbox of first row
        await this.checkbox_OrderType.waitFor({ state: 'visible' });
        await this.checkbox_OrderType.check();   // Better than click() for checkboxes

        np
    }*/async SelectCheckbox_OrderType(orderTypeName) {
        if (!orderTypeName) {
            throw new Error('orderTypeName is required');
        }

        const row = this.page
            .getByRole('row')
            .filter({ hasText: orderTypeName })
            .first(); // handle duplicates safely

        await expect(row).toBeVisible();

        const checkbox = row.getByRole('checkbox');
        await checkbox.check();

        await expect(this.OrderTypeGroupMapButton).toBeEnabled();
    }
    // 4️⃣ Click Map Order Type button
    async SelectMapButton_OrderType() {
        await this.OrderTypeGroupMapButton.waitFor({ state: 'visible' });
        await OrderTypeGroupMapButton.click();
    }


}
module.exports = { OrderType };
