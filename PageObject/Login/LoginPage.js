const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.loginHeading = page.getByRole('heading', { name: 'Login' });
        this.loginIdInput = page.getByPlaceholder('Enter Login ID');
        this.passwordInput = page.getByPlaceholder('Enter Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidLoginError = page.locator(
            ".mat-simple-snack-bar-content:has-text('AUTH_00003 - Invalid Login Id / Password. Please retry.')"
        );
    }
    async goTo(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }
    async waitForPageToBeReady(timeout = 60000) {
        const loader = this.page.locator('.mat-progress-spinner');

        // Step 1: Give loader a chance to appear (but don’t fail if it doesn’t)
        await loader.waitFor({ state: 'attached', timeout: 2000 }).catch(() => { });

        // Step 2: If attached, wait for it to disappear
        await loader.waitFor({ state: 'hidden', timeout }).catch(() => { });
    }

    async validLogin(loginUserId, loginPassword) {
        await this.loginIdInput.fill(loginUserId);
        await this.passwordInput.fill(loginPassword);
        await this.page.waitForLoadState('networkidle');
    }
    async clickLoginButton() {
        await expect(this.loginButton).toBeEnabled();
        await this.loginButton.click();
    }
    async verifyInvalidLoginErrorMessage() {
        await expect(this.invalidLoginError).toBeVisible();
    }
}
module.exports = { LoginPage };
