const Pool = require('pg').Pool

const data = new Pool({
    user: 'postgres',
    database:'students',
    password: 'postgres',
    host: 'localhost',
    port:5432,
})
module.exports = data
