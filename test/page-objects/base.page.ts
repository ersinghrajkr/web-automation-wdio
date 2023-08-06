import chai from "chai";

export default class BasePage {
    constructor() {}

    /**
     * All reusable web functions
     */
    async navigateTo(path: string) {
        await browser.url(path); // To be implemented by child class
        await browser.maximizeWindow()
    }

    async click(ele: WebdriverIO.Element) {
        await ele.waitForClickable({timeout:5000} )
        if(!ele.elementId) {
            throw Error(ele.error.message)
        }
        await ele.click();
    }

    async typeInto(ele: WebdriverIO.Element, txtVal: string) {
        await ele.waitForDisplayed({timeout: 5000})
        if(!ele.elementId) {
            throw Error(ele.error.message)
        }
        await ele.setValue(txtVal);
    }
}