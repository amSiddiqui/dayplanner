const mysql = require("mysql");

var pool = mysql.createPool({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    timezone: '+05:30'
});

module.exports = pool;