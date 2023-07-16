import {config as baseConfig } from './wdio.conf.js';


export const config = Object.assign(baseConfig, {
    environment: 'QA',
    shoreURL: 'https://shore-qa.otaliodev.com',
    ship2URL: 'https://ship2-qa.otaliodev.com',
    sqlConfig: {
        user: '',
        password: '',
        database: '',
        server: '',
        options: {}
    }
})