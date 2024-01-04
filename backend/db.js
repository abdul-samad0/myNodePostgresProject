const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pgConfig = {
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
};

const client = new Client(pgConfig);

async function connectToPostgres() {
    try {
        console.log('Connecting to PostgreSQL...');
        await client.connect();
        console.log('Connected to PostgreSQL');
    } catch (error) {
        console.error('Error connecting to PostgreSQL:', error);
    }
}

async function disconnectFromPostgres() {
    try {
        console.log('Disconnecting from PostgreSQL...');
        await client.end();
        console.log('Disconnected from PostgreSQL');
    } catch (error) {
        console.error('Error disconnecting from PostgreSQL:', error);
    }
}

module.exports = { connectToPostgres, disconnectFromPostgres, client };