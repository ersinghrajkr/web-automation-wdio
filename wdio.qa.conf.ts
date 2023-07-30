import {config as baseConfig } from './wdio.conf.js';


export const config = Object.assign(baseConfig, {
    environment: 'QA',
    baseURL: 'https://www.saucedemo.com/',
    shoreURL: 'https://www.saucedemo.com/v1/index.html',
    sqlConfig: {
        user: 'hello',
        password: 'hello',
        database: 'hello',
        server: 'hello',
        options: {}
    }
})