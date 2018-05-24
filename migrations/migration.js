var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit: 10,
  host           : 'localhost',
  user           : 'root',
  password       : 'root',
  database       : 'todoList'
});

migration.init(connection, __dirname);