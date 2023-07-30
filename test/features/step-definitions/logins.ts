import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";

Given(/^As (a|an) (.*) user I login to SwagLabs$/, async function (prefixTxt, userType, dataTable) {
	// console.log(`CONFIGS - ${JSON.stringify(browser.options)}`);
	// @ts-ignore
	console.log(`URL >>>> ${browser.options.shoreURL}`);
	let dt = dataTable.hashes();
	console.log(`dataTable type>>>> ${dt.constructor}`);
	console.log(`dataTable Value>>>> ${JSON.stringify(dt)}`);
	// @ts-ignore
	console.log("UserType>>>>", userType);
	// @ts-ignore
	await browser.url(`${browser.options.shoreURL}`);
	try {
		console.log(
			`Credentials >>>> ${process.env.TEST_STD_USERNAME} - ${process.env.TEST_STD_PASSWORD}`
		);
		(await $("#user-name")).addValue(dt[0].Username);
		(await $("#password")).addValue(dt[0].Password);
		(await $("#login-button")).click();
	} catch (error) {
		console.log(`Error in first login. Retrying...`);
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
	console.log("logo>>>>", headerLabel);
	expect(headerLabel).to.equal(`Products`);
	await browser.pause(2000);
});

Then(/Inventory page should list (.*)$/, async function (noOfProduct) {
	if (!noOfProduct) {
		throw Error(`Invalid No Of Products Count Provided: ${noOfProduct}`);
	}
	let eleArr = await $$(".inventory_item");
	expect(eleArr.length).to.be.equal(Number(noOfProduct));
});
