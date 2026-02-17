const { expect } = require('@playwright/test');

class MenuPanel {
    constructor(page) {
        this.page = page;

        this.AddNewMenuPanel = page.locator(".btnAdd");
        this.dialog = page.locator('.mat-dialog-container');
        this.MenuMappingpPopupDialog = this.page.locator('.mat-dialog-container').last();
        this.MenuName = this.dialog.getByRole('textbox', { name: 'Name' });
        this.RowCount = this.dialog.getByRole('textbox', { name: 'Row Count' });
        this.ColumnCount = this.dialog.getByRole('textbox', { name: 'Column Count' });
        this.DisplayOrder = this.dialog.getByRole('textbox', { name: 'Display Order' });
        this.CellMarginTop = this.dialog.getByRole('textbox', { name: 'Cell Margin Top' });
        this.CellMarginBottom = this.dialog.getByRole('textbox', { name: 'Cell Margin Bottom' });
        this.CellMarginLeft = this.dialog.getByRole('textbox', { name: 'Cell Margin Left' });
        this.CellMarginRight = this.dialog.getByRole('textbox', { name: 'Cell Margin Right' });
        this.saveButtonInDialog = this.dialog.getByRole('button', { name: 'Save save' });
        this.recordSavedMessage = this.page.getByText('Record has been saved');
        this.closeButton = this.dialog.getByText('X', { exact: true });
        this.EditMenuPanel = this.page.getByRole('cell').filter({ hasText: /^$/ }).last();
        this.ProductMenuNameSearch = this.page.getByRole('textbox', { name: 'Search' })
        this.MenuMappingButton = this.MenuMappingpPopupDialog.getByText('Menu Mapping');
        this.AddNewMenuPanelMapping = this.MenuMappingpPopupDialog.getByRole('button', { name: '+' });
        this.MenuItemDropdownBtn = this.MenuMappingpPopupDialog.getByText('MenuMenu');
        this.SearchMenuInMenuItemDropdown = this.MenuMappingpPopupDialog.getByRole('textbox', { name: 'dropdown search' });
        this.MenuMappingSaveBtn = this.MenuMappingpPopupDialog.getByRole('button', { name: 'Save save' });
        this.MenuMappingCloseBtn = this.MenuMappingpPopupDialog.getByText('X');
    }
    async clickAddNewMenuPanel() {
        await expect(this.AddNewMenuPanel).toBeEnabled();
        await this.AddNewMenuPanel.click();
        await expect(this.dialog).toBeVisible();
    }
    async enterMenuDetails(menuName, rowCount, columnCount, displayOrder, cellMarginTop, cellMarginBottom, cellMarginLeft, cellMarginRight) {
        await this.page.waitForLoadState('networkidle');
        this.menuNameValue = menuName;
        await expect(this.MenuName).toBeVisible();
        await this.MenuName.fill(menuName, { delay: 500 });
        await this.RowCount.fill(rowCount.toString(), { delay: 100 });
        await this.ColumnCount.fill(columnCount.toString(), { delay: 100 });
        await this.DisplayOrder.fill(displayOrder.toString(), { delay: 100 });
        await this.CellMarginTop.fill(cellMarginTop.toString(), { delay: 100 });
        await this.CellMarginBottom.fill(cellMarginBottom.toString(), { delay: 100 });
        await this.CellMarginLeft.fill(cellMarginLeft.toString(), { delay: 100 });
        await this.CellMarginRight.fill(cellMarginRight.toString(), { delay: 100 });
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
        await this.recordSavedMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });
    }
    async closeMenuPanelDialog() {

        await expect(this.closeButton).toBeVisible();
        await this.closeButton.click();
        await expect(this.dialog).not.toBeVisible();
    }
    async searchAndSelectPanel(panelName) {
        await this.ProductMenuNameSearch.fill(panelName, { delay: 500 });
        await this.page.waitForTimeout(5000);
    }
    // Click on "Actions" button for the specific Menu Panel
    async ClickOnActionsButtonForMenuPanel() {
        await this.EditMenuPanel.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        await this.EditMenuPanel.click();
    }
    // Click on "Menu Mapping" button within Menu Panel dialog
    async ClickOnMenuMappingButton() {
        await this.MenuMappingButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        await this.MenuMappingButton.click();
        console.log('Clicking on Menu Mapping button');
    }
    // Click on "Add New Menu Mapping" button within Menu Mapping popup
    async ClickOnAddNewMenuMapping() {
        await this.AddNewMenuPanelMapping.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        await this.AddNewMenuPanelMapping.click();
        console.log('Clicking on Add New Menu Mapping button');
    }
    // Search and select menu in dropdown within Menu Mapping popup
    async SearchAndSelectMenuInDropdown(menuName) {
        await this.MenuItemDropdownBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        await this.MenuItemDropdownBtn.click();
        const menuOption = this.page.getByRole('option', { name: menuName }).last(); // in case duplicates exist
        await menuOption.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        await expect(menuOption).toBeVisible();
        await menuOption.click();
    }
    //Save Menu Mapping and validate success message
    async clickMenuMappingSaveButton() {
        await expect(this.MenuMappingSaveBtn).toBeEnabled();
        await this.MenuMappingSaveBtn.click();
        await expect(this.recordSavedMessage).toBeVisible();
        const messageText = (await this.recordSavedMessage.innerText())?.trim();
        console.log('Popup message:', messageText);
        if (/record has been saved successfully/i.test(messageText)) {
            console.log(`✅ Menu Mapping for "${this.menuNameValue}" saved successfully`);
        }
        else {
            console.log(`❓ Unknown response for Menu Mapping of "${this.menuNameValue}"`);
            console.log(`📩 Message: ${messageText}`);
        }
        await this.recordSavedMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });
    }
    // Optional: If there's a need to close the entire Menu Panel after mapping
    async clickMenuMappingCloseButton() {
        await this.MenuMappingCloseBtn.click();
        await this.page.waitForTimeout(2000);
    }
}
module.exports = { MenuPanel };