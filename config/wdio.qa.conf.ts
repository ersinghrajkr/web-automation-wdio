import {config as baseConfig } from './wdio.conf.js';


export const config = Object.assign(baseConfig, {
    environment: 'QA',
    baseURL: 'https://shore-qa.otaliodev.com'
})