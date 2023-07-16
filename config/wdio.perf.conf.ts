import {config as baseConfig } from './wdio.conf.js';


export const config = Object.assign(baseConfig, {
    environment: 'PERF',
    qaURL: 'https://shore-performance.otaliodev.com'
})