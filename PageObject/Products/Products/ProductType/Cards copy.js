const { expect } = require('@playwright/test');

class Cards {
    constructor(page) {
        this.page = page;

        this.AddNewCardProduct = this.page.getByRole('button', { name: '+' });
        this.ProductName = this.page.getByRole('textbox', { name: 'Product Name' });
        this.ProductType = this.page.getByLabel('Product Type *');
        this.ProductTypeDropdown = this.page.locator('span');
        this.SaveProducts = this.page.getByRole('button', { name: 'Save save' });
        this.recordSavedMessage = this.page.getByText('Record has been saved');

        this.DisplayOrder = page.getByRole('textbox', { name: 'Display Order' });
        this.OrderType = this.page.getByLabel('Order Type');
        this.OrderTypeDropdown = this.page.locator('span');
        //this.OrderTypeDropdown = this.page.getByRole('textbox', { name: 'dropdown search' });

        this.CategoryType = this.page.getByLabel('Category');
        this.CategoryTypeDropdown = this.page.locator('span');
        // this.CategoryTypeDropdown = this.page.getByRole('textbox', { name: 'dropdown search' });

        this.PosCounterType = this.page.getByLabel('POS Counter');
        this.PosCounterTypeDropdown = this.page.locator('span');
        //this.PosCounterType = this.page.getByRole('listbox', { name: 'POS Counter' });
        //this.PosCounterTypeDropdown = this.page.getByRole('textbox', { name: 'dropdown search' });

        //-------------Checkbox-------------------
        this.QuantityPromtCheckbox = this.page.locator('label').filter({ hasText: 'Quantity Prompt' });
        this.AllowPriceOverrideCheckbox = this.page.locator('label').filter({ hasText: 'Allow Price Override' });
        this.AutoGenerateCardNumberCheckbox = this.page.locator('label').filter({ hasText: 'Auto Generate Card Number' });
        this.OnlyForVIPCheckbox = this.page.locator('label').filter({ hasText: 'Only For VIP' });
        this.DisplayInPosCheckbox = this.page.locator('label').filter({ hasText: 'Display In POS?' });
        this.ModifierCheckbox = this.page.locator('label').filter({ hasText: 'Modifier' });
        this.IsRecomendedCheckbox = this.page.locator('label').filter({ hasText: 'Is Recommended' });
        this.IssueNotificationDeviceCheckbox = this.page.locator('label').filter({ hasText: 'Issue Notification Device' });
        this.IsTransferCardCheckbox = this.page.locator('label').filter({ hasText: 'Is Transfer Card' });
        this.LinkChildCard = this.page.locator('label').filter({ hasText: 'Link Child Card' });
        this.EnableOTPValidationCheckbox = this.page.locator('label').filter({ hasText: 'Enable OTP Validation' });
        this.EnableOverrideOTP = this.page.locator('label').filter({ hasText: 'Enable Override OTP' });

        //-----------------Panels Popup-----------------------------------------
        this.AddNewMenuPanels = this.page.getByLabel('Product', { exact: true }).getByRole('button', { name: '+' });
        this.PanelsPopup = this.page.locator('#mat-dialog-2');

        this.PanelType = this.page.getByLabel('Panel *');
        this.PanelTypeDropdown = this.page.locator('span');
        this.PanelSaveBtn = this.page.locator("//button[@type='submit']");
        this.panelsClosebtn =this.page.getByText('X', { exact: true });

        this.SelctProducts = this.page.locator(`//tr[td[normalize-space()='cardsale']]//button`);
        this.selectProductsButton = this.page.locator('table tbody tr').filter({ hasText: 'cardsale' }).first().getByRole('button');

        //-------------------Card Product Price------------------------------
        this.PriceTab= this.page.getByText('Price', { exact: true });
        this.FaceValue=this.page.getByText('Face Value', { exact: true });
        this.Price=this.page.getByPlaceholder('Price',{exact:true})
        this.TaxType=this.page.getByLabel('Tax', { exact: true });
        this.TaxTypeDropdown=this.page.locator('span');
        //this.Tax=this.page.getByPlaceholder('Tax %',{exact:true})
        this.ServiceChargePercentage=this.page.getByRole('textbox', { name: 'Service charge percentage' });
        this.GratuityChargePercentage=this.page.getByRole('textbox', { name: 'Gratuity percentage' });

        this.TaxInclusiveCheckbox=this.page.locator('label').filter({ hasText: 'Tax Inclusive?' });
        this.ServiceChargeisApplicableCheckbox=this.page.locator('label').filter({ hasText: 'Service charge is applicable' });
        this.GratuityisApplicableCheckbox=this.page.locator('label').filter({ hasText: 'Gratuity is applicable' })

        //------------Entitelment Tab-------------------
        this.EntitlementsTab=this.page.getByText('Entitlements', { exact: true });

        this.CardValidFor=this.page.getByRole('textbox', { name: 'Card Valid For (in Days)' });
        this.Courtesy=this.page.getByRole('textbox', { name: 'Courtesy' });
        this.AddnewExtendedcredite= this.page.locator('app-product-credit-plus').getByRole('button', { name: '+' });

        this.CreditPlusAmount= this.page.getByRole('textbox', { name: 'Credit Plus Amount' });
        this.CardValidFor= this.page.getByRole('textbox', { name: 'Valid For Days' });
        this.Minutes= this.page.getByRole('textbox', { name: 'Minutes', exact: true });

        this.ExtendedCrediplusType = this.page.getByLabel('Credit Plus Type *');
        this.ExtendedCrediplusTypeDropdown = this.page.locator('span');
        
    }
    async EntitlementsTab_CardProduct()
    {
        await this.EntitlementsTab.click();
    }
    
    //-------------Add Card Product--------------------
    async AddNew_CardProduct() {
        await expect(this.AddNewCardProduct).toBeEnabled();
        await this.AddNewCardProduct.click();
    }
    async EnterDetails_CardProducts() {
        await this.page.waitForLoadState('networkidle');
        await this.ProductName.fill("bbb", { delay: 500 });

        await expect(this.ProductType).toBeVisible();
        await this.ProductType.click();
        await this.ProductTypeDropdown.filter({ hasText: 'CARDSALE' }).last().click();
    }
    async Save_CardProducts() {
        await expect(this.SaveProducts).toBeEnabled();
        await this.SaveProducts.click();
        await expect(this.recordSavedMessage).toBeVisible();
        const messageText = (await this.recordSavedMessage.innerText())?.trim();
        console.log('Popup message:', messageText);
        if (/record has been saved successfully/i.test(messageText)) {
            console.log(`✅ Product Menu "${this.ProductName}" created successfully`);
        }
        else if (/unique product menu names/i.test(messageText)) {
            console.log(`❌ Product Menu Creation Failed for: "${this.ProductName}"`);
            console.log(`⚠️ Message: ${messageText}`);
        }
        else {
            console.log(`❓ Unknown response for Product Menu "${this.ProductName}"`);
            console.log(`📩 Message: ${messageText}`);
        }
        await this.recordSavedMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });
    }
    // ----------------------Select Card Product-----------------------------
    async SelectProducts() {
        await this.page.waitForLoadState('networkidle');

        await this.selectProductsButton.waitFor({ state: 'visible' });
        await this.selectProductsButton.click();
    }
    //------------Enter Card Product Details in Product Screen ---------
    async EnterDetails_CardProducts_Product() {
        await this.DisplayOrder.fill("1", { delay: 500 });

        await expect(this.OrderType).toBeVisible();
        await this.OrderType.click();
        await this.OrderTypeDropdown.filter({ hasText: 'qaordertype2' }).last().click();

        await expect(this.CategoryType).toBeVisible();
        await this.CategoryType.click();
        await this.CategoryTypeDropdown.filter({ hasText: 'cat1' }).last().click();

        await expect(this.PosCounterType).toBeVisible();
        await this.PosCounterType.click();
        await this.PosCounterTypeDropdown.filter({ hasText: 'default' }).last().click();
    }

    async setCheckboxByLabel(labelName, value) {
        const checkbox = this.page.locator('label').filter({ hasText: labelName });
        await expect(checkbox).toBeVisible();
        const isChecked = await checkbox.isChecked();
        if (value === 1 && !isChecked) {
            await checkbox.click();
        }
        else if (value === 0 && isChecked) {
            await checkbox.click();
        }
    }
    //-----------Add a Menu panel for Product------------
    async AddNewMenuPanels_Product() {
        this.AddNewMenuPanels.click();
    }
    async EnterMenuPanelDetail_Product() {
        await this.page.waitForLoadState('networkidle');
        await this.PanelType.click();
        await this.PanelTypeDropdown.filter({ hasText: 'a44' }).last().click();
    }
    async SaveMenuPanels_Product()
    {
        await expect(this.PanelSaveBtn).toBeEnabled();
        await this.PanelSaveBtn.click();
        await expect(this.recordSavedMessage).toBeVisible();
        const messageText = (await this.recordSavedMessage.innerText())?.trim();
        console.log('Popup message:', messageText);
        if (/record has been saved successfully/i.test(messageText)) {
            console.log(`✅ Product Menu "${this.PanelTypeDropdown}" Added  successfully For Card Product "${this.ProductName}"`);
        }
        else if (/unique product menu names/i.test(messageText)) {
            console.log(`❌ Product Menu Added Failed for: "${this.ProductName}"`);
            console.log(`⚠️ Message: ${messageText}`);
        }
        else {
            console.log(`❓ Unknown response for Product Menu "${this.ProductName}"`);
            console.log(`📩 Message: ${messageText}`);
        }
        await this.recordSavedMessage.waitFor({ state: 'hidden', timeout: 10000 }).catch(() => { });
    }
    async CloseMenuPanel_Product()
    {
        await this.panelsClosebtn.click();
    }
    //----------Enter Details in Price Tab------------------------------------------
    async Pricetab_CardProduct()
    {
        await this.PriceTab.click();
    }
    async EnterPriceDetails_Pricetab(FaceValue,Price,Tax,ServiceCharge,GratuityCharge)
    {
        await this.FaceValue.fill(FaceValue, { delay: 500 });
        await this.Price.fill(Price,{delay:500});
        await this.TaxType.click();
        await this.TaxTypeDropdown.filter({ hasText: Tax }).last().click();
        await this.ServiceChargePercentage.fill(ServiceCharge,{delay:500});
        await this.GratuityChargePercentage.fill(GratuityCharge,{delay:500});
    }

}
module.exports = { Cards };