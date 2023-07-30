import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../helpers/logger.helper.js";

Given(/^As (a|an) (.*) user I login to SwagLabs$/, async function (prefixTxt, userType, dataTable) {
	// Accessing Global Variable inside the steps coming from CustomWorld.ts. But it will be accessible for first set of data table
	logger.info("CustomeWorld Global Variable - anyGlobalVar: ", this.anyGlobalVar);
	logger.info("Starting Test CaseId: ", this.testid);
	// console.log(`CONFIGS - ${JSON.stringify(browser.options)}`);
	// @ts-ignore
	logger.info(`URL >>>> ${browser.options.shoreURL}`);
	let dt = dataTable.hashes();
	// console.log(`dataTable type>>>> ${dt.constructor}`);
	// console.log(`dataTable Value>>>> ${JSON.stringify(dt)}`);
	// @ts-ignore
	// console.log("UserType>>>>", userType);
	// @ts-ignore
	await browser.url(`${browser.options.shoreURL}`);
	try {
		logger.info(
			`Credentials >>>> ${process.env.TEST_STD_USERNAME} - ${process.env.TEST_STD_PASSWORD}`
		);
		(await $("#user-name")).addValue(dt[0].Username);
		(await $("#password")).addValue(dt[0].Password);
		(await $("#login-button")).click();
	} catch (error) {
		logger.error(`Error in first login. Retrying...`);
		await browser.refresh();
		await browser.pause();
		// (await $("#user-name")).setValue(`standard_user`);
		// (await $("#password")).setValue(`secret_sauce`);
		// (await $("#login-button")).click();
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
	logger.info(`${this.testid}: Checking the No Of Products in Inventory!`)
	let eleArr = await $$(".inventory_item");
	expect(eleArr.length).to.be.equal(Number(noOfProduct));
});
