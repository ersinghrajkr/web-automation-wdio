import { setWorldConstructor } from "@wdio/cucumber-framework";
import { expect } from "chai";

/**
 * @anyGlobalVar this.anyGlobalVar="ABC123" use this format to set and get values anywhere inside the test steps. It is accessible globally
 */
class CustomWorld {
    anyGlobalVar: string
    testid: string
    I_AM_RUNTIME_GLOBAL_VAR: string
	constructor() {
        this.anyGlobalVar = 'Default_Val';
        this.testid='';
        this.I_AM_RUNTIME_GLOBAL_VAR = '';
    }
}

setWorldConstructor(CustomWorld);
