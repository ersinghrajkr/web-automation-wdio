import chai, { use } from "chai";
import cucumberJson from "wdio-cucumberjs-json-reporter";
import BasePage from "./base.page.js";
// import reporter from '../helpers/'

class Homepage extends BasePage {
	constructor() {
		super();
	}

	/**
	 * Page Objects
	 */
	get usernameInputTxt() {
		return $("#user-name");
	}

	get passwordInputTxt() {
		return $("#password");
	}

	get loginBtn() {
		return $("#login-button");
	}

	/**
	 * Page Actions
	 */
	async enterUsername(testid: string, username: string) {
		if (!username) throw Error(`Given username ${username} is not valid`);
		try {
			username = username.trim();
			await this.typeInto(await this.usernameInputTxt, username);
		} catch (error) {
			// error.message = `Error while wntering ${username}, ${error.message}`;
			throw error;
		}
	}

	async enterPassword(testid: string, passowrd: string) {
		if (!passowrd) throw Error(`Given passowrd is not valid`);
		try {
			passowrd = passowrd.trim();
			await this.typeInto(await this.passwordInputTxt, passowrd);
		} catch (error) {
			// error.message = `Error while entering, ${error.message}`;
			throw error;
		}
	}

	async clickLoginBtn(testid: string) {
		try {
			await this.click(await this.loginBtn);
		} catch (error) {
			// error.message = `Error while login, ${error.message}`;
			throw error;
		}
	}

	async loginToSauceApp(testid: string, username: string, passowrd: string) {
		try {
			await this.enterUsername(testid, username);
			await this.enterPassword(testid, passowrd);
			await this.clickLoginBtn(testid);
		} catch (error) {
			throw error;
		}
	}
}

export default new Homepage();
