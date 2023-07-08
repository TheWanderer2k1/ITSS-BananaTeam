const { query } = require('express');
const mysql=require('mysql');
require("dotenv").config();
    console.log("Starting init database. Please wait...\n");

    exports.QueryGetData = async(queryString) => {
      return new Promise((resolve, reject) => {
        var connection = mysql.createConnection(process.env.MYSQL_URL)
    
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
          var connection = mysql.createConnection(process.env.MYSQL_URL)
      
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
 