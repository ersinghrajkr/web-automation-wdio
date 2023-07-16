import {config as baseConfig } from './wdio.conf.js';


export const config = Object.assign(baseConfig, {
    environment: 'QA-INIT',
    qaURL: 'https://shore-qa-init.otaliodev.com'
})