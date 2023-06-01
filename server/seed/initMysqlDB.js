const mysql=require('mysql');
require("dotenv").config();
    console.log("Starting init database. Please wait...\n");

    var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'tabeyoudb'
      });

module.exports = connection;
 