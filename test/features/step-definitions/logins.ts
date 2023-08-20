import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../helpers/logger.helper.js";
import sauceHomePage from "../../page-objects/saucehome.page.js";
import apiHelper from '../../helpers/api.helper.js';
import constants from '../../../fixtures/constants.json' assert { type: "json" };

type CustomResponse<T> = {
	request: {
	  method: string;
	  url: string;
	  headers?: Record<string, string>;
	  // Other request-related properties you need
	};
	response: T;
  };


Given(/^As (a|an) (.*) user I login to SwagLabs$/, async function (prefixTxt, userType, dataTable) {
	// Accessing Global Variable inside the steps coming from CustomWorld.ts. But it will be accessible for first set of data table
	// logger.info("CustomeWorld Global Variable - anyGlobalVar: ", this.anyGlobalVar);
	// this.anyGlobalVar = 'Default_Val_overriden';
	// logger.info("CustomeWorld Global Variable - anyGlobalVar: ", this.anyGlobalVar);
	// logger.info("Starting Test CaseId: ", this.testid);
	// console.log(`CONFIGS - ${JSON.stringify(browser.options)}`);
	// @ts-ignore
	// logger.info(`URL >>>> ${browser.options.shoreURL}`);
	// let dt = dataTable.hashes();
	// console.log(`dataTable type>>>> ${dt.constructor}`);
	// console.log(`dataTable Value>>>> ${JSON.stringify(dt)}`);
	// @ts-ignore
	// console.log("UserType>>>>", userType);
	await browser.call(async () => {
		let requestOptions = {
			testId: this.testid,
			baseURL: "https://reqres.in/",
			endpoint: constants.REQRES.GET_USERS,
			payload: {email: "eve.holt@reqres.in",password: "pistol"}
		}
		// @ts-ignore
		// let {req, text, header, status } = await apiHelper.POST(requestOptions);
		let responseData= await apiHelper.POST(requestOptions);
		logger.info(`${this.testId}: ResponseObject - ${JSON.stringify(responseData)}`);
		// logger.info(`${this.testId}: ResponseObject - ${JSON.stringify(text)}`,body);
		// logger.info(`${this.testId}: RequestObject - ${JSON.stringify(req)}`);
		// logger.info(`${this.testId}: RequestHeader - ${JSON.stringify(header)}`);
		// logger.info(`${this.testId}: ResponseStatus - ${JSON.stringify(status)}`);
	})
	
	try {
		// @ts-ignore
		await sauceHomePage.navigateTo(`${browser.options.shoreURL}`);
		await sauceHomePage.loginToSauceApp(this.testid, process.env.TEST_STD_USERNAME, process.env.TEST_STD_PASSWORD);
		logger.info(`Credentials >>>> ${process.env.TEST_STD_USERNAME} - ${process.env.TEST_STD_PASSWORD}`);
	} catch (error) {
		error.message = `Faled at login step, ${error}`;
		throw error;
	}
	await browser.pause(2000);
});

When(/^Products page is opened$/, async function () {
	// throw Error(`Failed`);
	let ele = await $(".product_label");
	let headerLabel = await ele.getText();
	logger.info("logo>>>>", headerLabel);
	expect(headerLabel).to.equal(`Products`);
	await browser.pause(2000);
});

Then(/Inventory page should list (.*)$/, async function (noOfProduct) {
	if (!noOfProduct) {
		throw Error(`Invalid No Of Products Count Provided: ${noOfProduct}`);
	}
	logger.info(`${this.testid}: Checking the No Of Products in Inventory!`);
	let eleArr = await $$(".inventory_item");
	expect(eleArr.length).to.be.equal(Number(noOfProduct));
	// @ts-ignore
	this.I_AM_RUNTIME_GLOBAL_VAR = "I_AM_RUNTIME_GLOBAL_VAR";
	// @ts-ignore
	console.log(`I_AM_RUNTIME_GLOBAL_VAR -  ${this.I_AM_RUNTIME_GLOBAL_VAR}`);
});
