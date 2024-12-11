
class LoginPage {
    constructor(page) {
		this.page = page;

		// Locators
		this.usernameField = 'input#username'; 
		this.passwordField = 'input#password';
		this.loginButton = 'button[type="submit"]:has-text("Sign in")';     
  	}

	async enterUsername(username) {
		await this.page.locator(this.usernameField).fill(username);
	}

	async enterPassword(password) {
		await this.page.locator(this.passwordField).fill(password);
	}

	async clickLogin() {
		await this.page.click(this.loginButton);
	}

	async login(username, password) {
		await this.page.waitForLoadState('networkidle');
		await this.enterUsername(username);
		await this.enterPassword(password);
		await this.clickLogin();
	}
}
  
module.exports = LoginPage;