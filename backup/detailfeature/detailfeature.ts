// Add import statements for the types used in step definitions
import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "chai";

Given("Google Homepage is opened", async function () {
  await browser.url("https://www.google.com");
});

When("Search with {string}", async function (searchItem: string) {
  let ele = await $('[name="q"]');
  await ele.click();
  await ele.setValue(searchItem);
  await browser.keys("Enter");
});

Then("Click on the first result", async function () {
  let ele = await $("h3");
  await ele.click();
});

Then("URL should match {string}", async function (expectedURL: string) {
  let actualURL = await browser.getUrl();
  expect(actualURL).to.equal(expectedURL);
});
