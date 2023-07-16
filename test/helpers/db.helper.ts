import request from 'supertest';
import mysql, { ConnectionOptions } from 'mysql2';


const dbConfig: ConnectionOptions = {
    user: '',
    database: ''
}

const conn = mysql.createConnection(dbConfig);

console.log('DB Connection: ', conn)