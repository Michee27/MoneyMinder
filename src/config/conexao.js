const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'Mercilia@22',
    database: 'dindin',
})

module.exports = pool
