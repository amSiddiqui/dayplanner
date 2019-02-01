const mysql = require("mysql");
var db = null;

module.exports = function(){
    if(!db){
        db = mysql.createConnection({
            host: process.env.HOST,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME
        });
    }
    return db;
};