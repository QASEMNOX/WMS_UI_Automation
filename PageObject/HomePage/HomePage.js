class HomePage {
    constructor(page) {
        this.page = page;
        this.dropdownButton = page.locator(".mat-form-field-flex");
        this.siteOptions = page.locator("mat-option .mat-option-text");
        //this.menuDropdown=page.locator(".nav_name_icon");
        //this.subMenuDropdown=page.locator('div.child a.mat-list-item');
        // Scope to left navigation menu
        this.leftNav = page.getByRole('navigation');

        // ✅ Parent menu (expand section) → NOT a link
        this.productsMenu = this.leftNav
            .locator('div', { hasText: 'Products' })
            .first();

        // ✅ Submenu items → links
        this.productsSubMenu = this.leftNav.getByRole('link', { name: 'Products' });
        this.discountsSubMenu = this.leftNav.getByRole('link', { name: 'Discounts' });
        this.taxSubMenu = this.leftNav.getByRole('link', { name: 'Tax' });

        this.dropdownButton = page.locator('.mat-form-field-flex');
        this.siteOptions = page.locator('mat-option .mat-option-text');

        this.siteSetup_Menu = this.leftNav.locator('div', { hasText: 'Site Setup' }).first();
        this.CustomAttributeSubMenu = this.leftNav.getByRole('link', { name: 'Custom Attributes' });
        this.OrderTypeGroupSubMenu = this.leftNav.getByRole('link', { name: 'Order Type Group' });

    }
    async SelectSiteDropdown(siteName) {
        await this.dropdownButton.waitFor({ state: 'visible' });
        await this.dropdownButton.click();
        await this.siteOptions.filter({ hasText: siteName }).click();
    }
    async MenueSelection() {
        await this.productsMenu.waitFor({ state: 'visible' });
        await this.productsMenu.click();
        await this.productsSubMenu.waitFor({ state: 'visible' });
        await this.productsSubMenu.click();
    }

    async Sitesetup_CustomAttribute_MenueSelection() {
        await this.siteSetup_Menu.click();
        await this.CustomAttributeSubMenu.click();
    }
    //await this.MenuMappingButton.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
    async Sitesetup_OrderTypeGroup_MenueSelection() {
        await this.siteSetup_Menu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        await this.siteSetup_Menu.click();
        await this.OrderTypeGroupSubMenu.waitFor({ state: 'visible', timeout: 5000 }).catch(() => { });
        await this.OrderTypeGroupSubMenu.click();
    }
    /* Using JSON data
    async MenueSelection(menuName) {
        await this.menuDropdown.waitFor({ state: 'visible' });
        const menu = this.menuDropdown.filter({ hasText: menuName });
        await menu.waitFor({ state: 'visible' });
        await menu.click();
    }
    async SubMenueSelection(subMenuName) {
        const submenu = this.subMenuDropdown.filter({ hasText: subMenuName });
        await submenu.click();
        await this.page.waitForLoadState('networkidle');
    }*/
}
module.exports = { HomePage };