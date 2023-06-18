const { query } = require('express');
const mysql=require('mysql');
require("dotenv").config();
    console.log("Starting init database. Please wait...\n");

    exports.QueryGetData = async(queryString) => {
      return new Promise((resolve, reject) => {
        var connection = mysql.createConnection({
          host: process.env.MYSQL_HOST,
		      port: process.env.MYSQL_PORT,
          user: process.env.MYSQL_USERNAME,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE
        });
    
        connection.connect();
    
        connection.query(queryString, function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(JSON.stringify(results))); 
          }
        });
    
        connection.end();
      });
      }

      exports.QueryUpdateData = async (queryString) => {
        return new Promise((resolve, reject) => {
          var connection = mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE
          });
      
          connection.connect();
      
          connection.query(queryString, function (err, results) {
            if (err) {
              reject(err);
            } else {
              resolve(results.affectedRows); 
            }
          });
      
          connection.end();
        });
      }
 