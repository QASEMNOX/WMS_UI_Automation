class POSPage {

    constructor(page)  //if page is missing then there is no life for page defined in consructor

    {

        this.page = page;  //make it public , the page
        this.sitesetupNavigation = page.locator("div.nav_name_icon:has-text('Site Setup')");
        this.posManagementNavigation = page.getByRole('link', { name: 'POS Management' });
        this.posmachineTabSelect = page.getByRole('tab', { name: 'POS Machines' });
        this.posmachineAddButton = page.getByRole('tabpanel', { name: 'POS Machines' })
            .getByRole('button', { name: '+' });
        this.counterDropdown = page.getByRole('combobox', { name: 'Counter' });
        this.selectCounter = page.getByRole('option', { name: 'Default' });
        this.posName = page.locator("[placeholder='POS Name']");
        this.computerName = page.locator("[placeholder='Computer Name']");
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.backbrowserButton = page.locator('.back-arrow');


    }

    async selectSitesetup() {
        await this.sitesetupNavigation.click();


    }
    async selectPOSManagement() {
        await this.posManagementNavigation.click();
        await this.page.waitForLoadState('networkidle');

    }
    async createPOSMachine(posName, computerName) {

        // await this.userName.fill(email);  //here email was there, we change it to username, because PO should bot have data, because data should come from test
        await this.posmachineTabSelect.click();
        await this.posmachineAddButton.click();
        await this.counterDropdown.click();
        await this.selectCounter.click();
        await this.posName.fill(posName);
        await this.computerName.fill(computerName);
        await this.saveButton.click();
        await this.backbrowserButton.click();

    
    }
}

module.exports = { POSPage };
