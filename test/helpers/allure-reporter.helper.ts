import allure from "@wdio/allure-reporter"
import logger from './logger.helper.js';

function addStep(testid: string, loglevel: string, msg: string, toAllure = true, issueid = undefined) {
    let arr = ["info", "debug", "warn", "error"]
    if (!testid) throw Error(`Invalid testid: ${testid} field to report step`)
    if (!msg) logger.error(`Given message: ${msg} is not valid to report`)
    if (!arr.includes(loglevel)) logger.error(`Given loglevel: ${loglevel} is invalid and should be one of these values: ${arr}`)
    try {
        if (loglevel === "info") logger.info(`[${testid}]: ${msg}`)
        if (loglevel === "debug") logger.debug(`[${testid}]: ${msg}`)
        if (loglevel === "warn") logger.warn(`[${testid}]: ${msg}`)
        if (loglevel === "error") {
            logger.error(`[${testid}]: ${msg}`)
            allure.addStep(msg, {}, "failed") // Substep to fail if error
        } else {
            if (toAllure) allure.addStep(msg)
        }
        if (issueid) allure.addIssue(issueid)
    } catch (err) {
        throw Error(`Error reporting reporter step, ${err}`)
    }
}

export default { addStep }