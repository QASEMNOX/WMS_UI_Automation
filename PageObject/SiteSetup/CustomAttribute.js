const { expect } = require('@playwright/test');

class CustomAttribute {
    constructor(page) {
        this.page = page;

        this.AddNewCustomerAttribute = page.locator(".btnAdd");
        this.dialog = page.locator('.mat-dialog-container');
        this.AttributeName = this.dialog.getByLabel(/Attribute Name/i);
        this.typeDropdown = this.dialog.getByRole('combobox', { name: /type/i });
        // 🔹 Dynamic option
        this.typeOption = (type) => this.page.getByRole('option', { name: new RegExp(`^${type}$`, 'i') });
        this.applicabilityDropdown = this.dialog.getByRole('combobox', { name: /Applicability/i });
        this.applicabilityOption = (applicability) => this.page.getByRole('option', { name: new RegExp(`^${applicability}$`, 'i') });
        this.saveButton = this.dialog.getByRole('button', { name: 'Save' });
        this.SuccessfulySavedMessage = this.page.locator('.mat-snack-bar-container');
        this.CloseButton = this.page.locator('.close-button-popup');
        this.searchSection = this.page.locator('form'); // or card/container
        this.SearchCustomAttributeinMainPage = this.page.locator('input[type="text"]');
        this.CustomattributeRowCheckbox = (name) =>
            this.page
                .getByRole('row')
                .filter({ has: this.page.getByRole('cell', { name: name }) })
                .first()
                .getByRole('checkbox');
        this.CustomAttributeValuesSection = this.page.getByText('Attribute Values');
        this.CustomAddAttributeValueButton = this.page.getByText('Attribute Values').locator('..').getByRole('button', { name: '+' });
        this.CustomAttributeValueInput = this.page.getByRole('textbox', { name: /value/i });
        this.CustomAttributeValueSaveButton = this.page.getByRole('button', { name: /save/i });
        this.loadingSpinner = this.page.getByRole('progressbar');
    }
    async clickAddNewCustomerAttribute() {
        await this.AddNewCustomerAttribute.click();
    }
    async enterAttributeName(name) {
        await this.AttributeName.fill(name);
    }
    async selectType(type) {
        await this.typeDropdown.click();
        await this.typeOption(type).click();
    }
    async selectApplicability(applicability) {
        await this.applicabilityDropdown.click();
        await this.applicabilityOption(applicability).click();
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
        await this.CloseButton.click();
    }

    // part2
    async searchCustomAttribute(name) {
        await this.page.waitForLoadState('networkidle');
        console.log(`Searching for Custom Attribute: ${name}`);
        console.log(`Locator: ${this.SearchCustomAttributeinMainPage}`);
        console.log(`Filling search input with: ${name}`);
        await this.SearchCustomAttributeinMainPage.fill(name, { delay: 1000 });
    }
    async selectCustomAttributeCheckbox(name) {
        const checkbox = this.CustomattributeRowCheckbox(name);
        await expect(checkbox).toBeVisible();
        await checkbox.check();
    }

    async selectLastCustomAttributeCheckbox() {
        // Get all table rows that contain a checkbox (skip header)
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(10000);
        const rows = this.page
            .locator('table tbody tr')
            .filter({ has: this.page.getByRole('checkbox') });
        const lastRow = rows.last();
        const checkbox = lastRow.locator('td').first().getByRole('checkbox');
        await expect(lastRow).toBeVisible();
        await expect(checkbox).toBeVisible();
        await checkbox.locator('..').click();
    }

    async ClickonAddCustomAttributeValuesButton() {
        //  await this.CustomAttributeValuesSection.waitFor({ state: 'visible', timeout: 5000 });
        // await expect(this.CustomAttributeValuesSection).toBeVisible();
        await this.CustomAddAttributeValueButton.click();
    }
    async addCustomerAttributeListValues(value) {
        /*  // await this.searchCustomAttributeInput.fill(name); // Clear any existing text
          for (const valueObj of valueList) {
              const valueInput = this.dialog.getByLabel(/Value/i);
              await valueInput.fill(valueObj.Value);
              const SaveValueButton = this.dialog.getByRole('button', { name: /Save save/i });
              await SaveValueButton.click();
              const snackbar = this.page.locator('.mat-snack-bar-container').last();
              await expect(snackbar).toBeVisible();
              const messageText = (await snackbar.innerText()).trim();
              if (/record has been saved successfully/i.test(messageText)) {
                  console.log(`✅ Custom Attribute Value "${valueObj.Value}" added successfully`);
              } else {
                  throw new Error(
                      `❌ Failed to add Custom Attribute Value "${valueObj.Value}". Message: ${messageText}`
                  );
              }
          }*/
        const valueInput = this.dialog.getByLabel(/Value/i);
        await valueInput.fill(value);
        

    }
    async clickCustomAttributeValueSaveButton(value) {
        const SaveValueButton = this.dialog.getByRole('button', { name: /Save save/i });
        await SaveValueButton.click();
        const snackbar = this.page.locator('.mat-snack-bar-container').last();
        await expect(snackbar).toBeVisible();
        const messageText = (await snackbar.innerText()).trim();
        if (/record has been saved successfully/i.test(messageText)) {
            console.log(`✅ Custom Attribute Value "${value}" added successfully`);
        } else {
            throw new Error(
                `❌ Failed to add Custom Attribute Value "${value}". Message: ${messageText}`
            );
        }
    }
    async closecustomAttributeDialog() {
        await this.CloseButton.click();
    }
}
module.exports = { CustomAttribute };
