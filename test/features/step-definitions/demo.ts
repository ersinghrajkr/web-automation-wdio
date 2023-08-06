import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";
import logger from "../../helpers/logger.helper.js";

Given(/^Google Homepage is opened$/, async function () {
  // @ts-ignore
  console.log("Before Opening Browser!", JSON.stringify(browser.options.shoreURL));
  await browser.url("https://www.google.com");
  // await browser.debug();
  // await browser.pause(70000)
  console.log("After Opening Browser!");
});

When(/Search with (.*)$/, async function (searchItem) {
  console.log(`>> searchItem: ${searchItem}`);
  let ele = await $(`[name=q]`);
  await ele.click();
  await ele.setValue(searchItem);
  await browser.keys("Enter");
  // await browser.debug();
});

Then(/Click on the first result$/, async function () {
  let ele = await $(`<h3>`);
  await ele.click();
});

Then(/URL should match (.*)$/, async function (expectedURL) {
  console.log(`Expected URL - ${expectedURL}`);
  let actaulURL = await browser.getUrl();
  expect(actaulURL).to.equal(`${actaulURL}`);
  // await browser.debug();
  console.log("Client Timezone UTC",-((new Date()).getTimezoneOffset()/60), (new Date()).getTimezoneOffset());
  // @ts-ignore
	console.log(`I_AM_RUNTIME_GLOBAL_VAR -  ${this.I_AM_RUNTIME_GLOBAL_VAR}`);
  logger.info("CustomeWorld Global Variable - anyGlobalVar: ", this.anyGlobalVar);
});
