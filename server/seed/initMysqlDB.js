const fs = require('fs');
const mysql = require('mysql');

// MySQL connection settings
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tabeyou2'
});

// Read the SQL file
const sqlFile = fs.readFileSync('C:/Users/dell/Downloads/tabeyoudb.sql', 'utf8');

// Split the SQL file into individual statements
const sqlStatements = sqlFile.split('\nGO\n');

// Connect to MySQL and execute each statement
connection.connect((err) => {
  if (err) throw err;

  sqlStatements.forEach((statement) => {
    connection.query(statement, (error, results, fields) => {
      if (error) throw error;
      console.log('Statement executed successfully:', statement);
    });
  });

  connection.end(); // Close the MySQL connection
});