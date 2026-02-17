
class OfferGroup {

    constructor(page)  //if page is missing then there is no life for page defined in consructor

    {

        this.page = page;  //make it public , the page
        this.ProductsMenu = page.locator("div.nav_name_icon:has-text('Products')");
        this.ProductsSubMenu = page.getByRole('link', { name: 'Products' });
        this.OfferGroupMenu = page.getByRole('link', { name: 'Offer Groups' });
        this.AddButton = page.getByRole('button', { name: '+' });
        this.OfferGroupName = page.locator("[placeholder='Name']");
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.closeButton = page.locator('.close-button-popup');
        this.homeMenu = page.locator("div.nav_name_icon:has-text('Home')");
        this.isUpsellCheckbox = page
            .locator('mat-checkbox', { hasText: 'IsUpsell' })
            .locator('.mat-checkbox-inner-container');

    }

    async selectProductsSubMenu() {
        await this.ProductsMenu.click();
        await this.ProductsSubMenu.click();


    }
    async selectOfferGroup() {
        await this.OfferGroupMenu.click();
        await this.page.waitForLoadState('networkidle');

    }
    async createOfferGroup(OfferGroupName, isUpsell) {

        await this.AddButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.OfferGroupName.fill(OfferGroupName);

        isUpsell && await this.isUpsellCheckbox.click();


        await this.saveButton.click();

    }

    async closeOfferGroup() {
        await this.closeButton.click();
        await this.homeMenu.click();

    }
}

module.exports = { OfferGroup };