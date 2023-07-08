const fs = require('fs');
const mysql = require('mysql');
require('dotenv').config();
// MySQL connection settings
var connection = mysql.createConnection(process.env.MYSQL_URL);

// Read the SQL file
const sqlFile = fs.readFileSync('seed/tabeyoudb.sql', 'utf8');
//console.log(sqlFile);
// Split the SQL file into individual statements
const sqlStatements = sqlFile.split(';');

// Connect to MySQL and execute each statement

connection.connect((err) => {
  if (err) throw err;

  sqlStatements.forEach((statement) => {
    var statementTrue = (statement + ';').replace(/\n|\r/g, '');
    if (statementTrue != ';') {
      connection.query(
        statementTrue.trim().toString(),
        (error, results, fields) => {
          if (error) throw error;
          console.log('loading.....');
        }
      );
    } else {
    }
  });
  connection.end();
});
