const { LoginPage } = require('./Login/LoginPage');
const { HomePage } = require('./HomePage/HomePage');
const { Products_Products_Page } = require('./Products/Products/Products_Products_Page');
const { Products_Products_ProductCategory } = require('./Products/Products/ProductSetup/Products_Products_ProductCategory');
const { SiteSetup_CustomAttribute } = require('./SiteSetup/SiteSetup_CustomAttribute'); 
const { Products_Products_MenuPanel } = require('./Products/Products/ProductSetup/Products_Products_MenuPanel');
const { Products_Products_ProductMenu } = require('./Products/Products/ProductSetup/Products_Products_ProductMenu');
const { SiteSetup_OrderTypeGroup } = require('./SiteSetup/SiteSetup_OrderTypeGroup');


class POManager {
    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page);
        this.homePage = new HomePage(this.page);
        this.products_Products_Page=new Products_Products_Page(this.page);
        this.products_Products_ProductCategory=new Products_Products_ProductCategory(this.page);
        this.siteSetup_CustomAttribute = new SiteSetup_CustomAttribute(this.page);
        this.products_Products_MenuPanel = new Products_Products_MenuPanel(this.page);
        this.products_Products_ProductMenu = new Products_Products_ProductMenu(this.page);
        this.siteSetup_OrderTypeGroup = new SiteSetup_OrderTypeGroup(this.page);
    }
    getLoginPage() {
        return this.loginPage;
    }
    getHomePage() {
        return this.homePage;
    }
    getProducts_Products_Page(){
        return this.products_Products_Page;
    }
    getProducts_Products_ProductCategory(){
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
}
module.exports = { POManager };