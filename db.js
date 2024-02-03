const { Client } = require('pg');

const client = new Client({
    user: 'jtorr',
    host: 'localhost',
    database: 'perfectpetmatchdb',
    password: 'jt95',
    port: 5432,
});

client.connect()
.then(() => console.log('Connected to the database'))
.catch(err => console.error('Error connecting to the database', err));

module.exports = client;