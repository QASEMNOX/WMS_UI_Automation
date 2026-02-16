const { expect } = require('@playwright/test');

class Products_Products_Page {
    constructor(page) {
        this.page = page;

        this.AddNewProductCategory = page.locator(".btnAdd");

        this.cards = page.getByRole('button', { name: 'Cards' });
        this.nonCardSales = page.getByRole('button', { name: 'Non - Card Sales(F & B Etc)' });
        this.combo = page.getByRole('button', { name: 'Combo' });
        this.bookings = page.getByRole('button', { name: 'Bookings' });
        this.attractions = page.getByRole('button', { name: 'Attractions' });
        this.checkInOut = page.getByRole('button', { name: 'Check - In / Check - Out' });
        this.rental = page.getByRole('button', { name: 'Rental' });
        this.vouchers = page.getByRole('button', { name: 'Vouchers' });
        this.allProducts = page.getByRole('button', { name: 'All' });

        this.productType = page.getByRole('button', { name: 'Product Type' });
        this.productCategory = page.getByRole('link', { name: 'Product Category' });
        this.productModifiers = page.getByRole('button', { name: 'Product Modifiers' });
        this.priceList = page.getByRole('button', { name: 'Price List' });
        this.formatDisplayGroups = page.getByRole('button', { name: 'Format Display Groups' });
        this.posExclusions = page.getByRole('button', { name: 'POS Exclusions' });
        this.segmentDefinition = page.getByRole('button', { name: 'Segment Definition' });

        this.segmentDefinitionMapping = page.getByRole('button', { name: 'Segment Definition Mapping' });
        this.printGroups = page.getByRole('button', { name: 'Print Groups' });
        this.offerGroups = page.getByRole('button', { name: 'Offer Groups' });
        this.offerGroupProductMap = page.getByRole('button', { name: 'Offer Group Product Map' });
        this.waivers = page.getByRole('button', { name: 'Waivers' });
        this.productMenu = page.getByRole('link', { name: 'Product Menu' });
        this.panels = page.getByRole('link', { name: 'Panels' });

        this.customerProfilingGroup = page.getByRole('button', { name: 'Customer Profiling Group' });
        this.productGroup = page.getByRole('button', { name: 'Product Group' });
    }

    async clickCards() {
        await this.cards.click();
    }
    async clickNonCardSales() {
        await this.nonCardSales.click();
    }
    async clickCombo() {
        await this.combo.click();
    }
    async clickBookings() {
        await this.bookings.click();
    }
    async clickAttractions() {
        await this.attractions.click();
    }
    async clickCheckInOut() {
        await this.checkInOut.click();
    }
    async clickRental() {
        await this.rental.click();
    }
    async clickVouchers() {
        await this.vouchers.click();
    }
    async clickAllProducts() {
        await this.allProducts.click();
    }
    async clickProductType() {
        await this.productType.click();
    }
    async clickProductCategory() {
        await this.productCategory.click();
    }
    async clickProductModifiers() {
        await this.productModifiers.click();
    }
    async clickPriceList() {
        await this.priceList.click();
    }
    async clickFormatDisplayGroups() {
        await this.formatDisplayGroups.click();
    }
    async clickPosExclusions() {
        await this.posExclusions.click();
    }
    async clickSegmentDefinition() {
        await this.segmentDefinition.click();
    }
    async clickSegmentDefinitionMapping() {
        await this.segmentDefinitionMapping.click();
    }
    async clickPrintGroups() {
        await this.printGroups.click();
    }
    async clickOfferGroups() {
        await this.offerGroups.click();
    }
    async clickOfferGroupProductMap() {
        await this.offerGroupProductMap.click();
    }
    async clickWaivers() {
        await this.waivers.click();
    }
    async clickProductMenu() {
        await this.productMenu.click();
    }
    async clickPanels() {
        await this.panels.click();
    }
    async clickCustomerProfilingGroup() {
        await this.customerProfilingGroup.click();
    }
    async clickProductGroup() {
        await this.productGroup.click();
    }
}
module.exports = { Products_Products_Page };
