const { Pool } = require('pg');

const db = new Pool({
    connectionString: process.env.DB_URL,
    port: process.env.DB_PORT || 5432
})

module.exports = db