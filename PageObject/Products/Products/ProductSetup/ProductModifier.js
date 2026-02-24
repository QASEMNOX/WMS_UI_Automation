const { expect } = require('@playwright/test');

class ProductModifier {
    constructor(page) {
        this.page = page;
        this.AddNewProductProductModifier = page.locator(".btnAdd");
        this.ModifierName = this.page.getByRole('textbox', { name: 'Modifier Set Name' });
        this.ModifierMinQty = this.page.getByRole('textbox', { name: 'Min Quantity' });
        this.ModifierMaxQty = this.page.getByRole('textbox', { name: 'Max Quantity' });
        this.ModifierFreeQty = this.page.getByRole('textbox', { name: 'Free Quantity' });
        this.saveButton = this.page.getByRole('button', { name: 'Save save' });
        this.recordSavedMessage = this.page.getByText('Record has been saved');
        this.closeButton = this.page.getByText('Close');
        this.backButton = this.page.getByText('arrow_back');

    }
    async AddNew_ProductModifier() {
        await expect(this.AddNewProductModifier).toBeEnabled();
        await this.AddNewProductModifier.click();
    }
    async EnterDetails_ProductModifier(menuName, menuType, description) {
        await this.page.waitForLoadState('networkidle');
        this.menuNameValue = menuName;
        await this.Name.fill(menuName, { delay: 500 });
        await this.TypeDropdownbutton.click();
        await this.TypeDropdown.filter({ hasText: menuType }).last().click();
        await this.Description.fill(description, { delay: 500 });
    }
    async clickSaveButton() {
        await expect(this.saveButtonInDialog).toBeEnabled();
        await this.saveButtonInDialog.click();
        await expect(this.recordSavedMessage).toBeVisible();
        const messageText = (await this.recordSavedMessage.innerText())?.trim();
        console.log('Popup message:', messageText);
        if (/record has been saved successfully/i.test(messageText)) {
            console.log(`✅ Product Menu "${this.menuNameValue}" created successfully`);
        }
        else if (/unique product menu names/i.test(messageText)) {
            console.log(`❌ Product Menu Creation Failed for: "${this.menuNameValue}"`);
            console.log(`⚠️ Message: ${messageText}`);
        }
        else {
            console.log(`❓ Unknown response for Product Menu "${this.menuNameValue}"`);
            console.log(`📩 Message: ${messageText}`);
        }
        await this.recordSavedMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => {});
    }
    async closeMenuPanelDialog() {
        await this.closeButton.click();
        await expect(this.dialog).not.toBeVisible();
    }
}
module.exports = { ProductModifier };