import mysql from "mysql";

export default class Database {
  constructor() {
    this.db = mysql.createConnection({
      host    : 'localhost',
      user    : 'root',
      password: 'root',
      database: 'todoList'
    });
  }

  startConnection() {
    this.db.connect((error) => {
      if (error) {
        throw error;
      }
      console.log("Database Connected");
    });
  }

  stopConnection() {
    this.db.end((error) => {
      if (error) {
        throw error;
      }
      console.log("Database Closed");
    });
  }
}