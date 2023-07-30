import { BeforeStep } from "@wdio/cucumber-framework";

BeforeStep( function(){
    // @ts-ignore - coming from beforeScenario wdio.conf.ts
    this.testid=browser.options.testid;
})