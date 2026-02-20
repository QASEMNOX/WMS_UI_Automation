const { LoginPage } = require('./Login/LoginPage');
const { HomePage } = require('./HomePage/HomePage');
const { Products_Products_Page } = require('./Products/Products/Products_Products_Page');
const { ProductCategory } = require('./Products/Products/ProductSetup/ProductCategory');
const { CustomAttribute } = require('./SiteSetup/CustomAttribute');
const { MenuPanel } = require('./Products/Products/ProductSetup/MenuPanel');
const { ProductMenu } = require('./Products/Products/ProductSetup/ProductMenu');
const { OrderTypeGroup } = require('./SiteSetup/OrderTypeGroup');
const { OrderType } = require('./SiteSetup/OrderType');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.products_Products_Page = new Products_Products_Page(this.page);
        this.products_Products_ProductCategory = new ProductCategory(this.page);
        this.siteSetup_CustomAttribute = new CustomAttribute(this.page);
        this.products_Products_MenuPanel = new MenuPanel(this.page);
        this.products_Products_ProductMenu = new ProductMenu(this.page);
        this.siteSetup_OrderTypeGroup = new OrderTypeGroup(this.page);
        this.siteSetup_OrderType=new OrderType(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getHomePage() {
        return this.homePage;
    }
    getProducts_Products_Page() {
        return this.products_Products_Page;
    }
    getProducts_Products_ProductCategory() {
        return this.products_Products_ProductCategory;
    }
    getSiteSetup_CustomAttribute() {
        return this.siteSetup_CustomAttribute;
    }
    getProducts_Products_MenuPanel() {
        return this.products_Products_MenuPanel;
    }
    getProducts_Products_ProductMenu() {
        return this.products_Products_ProductMenu;
    }
    getSiteSetup_OrderTypeGroup() {
        return this.siteSetup_OrderTypeGroup;
    }
    getSiteSetup_OrderType() {
        return this.siteSetup_OrderType;
    }

    getPOSPage() {
        return this.posPage;
    }

    /**
 * @returns {import('./Products/ProductSetup/OfferGroup').OfferGroup}
 */
    getOfferGroupPage() {

        return this.offergroupPage;
    }

    getSegmentDefinitionPage() {
        return this.segmnetdefinitionPage;
    }

    getSegmentDefinitionMappingPage() {
        return this.segmentDefinitionMappingPage;
    }


    /**
* @returns {import('./Products/Tax/Tax').Tax}
*/
    getTaxPage() {
        return this.taxPage;
    }
    /**
     * @returns {import('./Products/Tax/TaxStructure').TaxStructure}
     */
    getTaxStructurePage() {
        return this.taxStructurePage;
    }


}
module.exports = { POManager };