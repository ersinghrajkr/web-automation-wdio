import {config as baseConfig } from './wdio.conf.js';


export const config = Object.assign(baseConfig, {
    environment: 'QA2',
    qaURL: 'https://shore-qa2.otaliodev.com'
})