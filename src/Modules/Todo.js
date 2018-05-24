import Database from "./../Libraries/Database";

export default class Todo {

  constructor() {
    this.Database = new Database();
  }

  checkCallback(callback) {
    if (typeof callback !== "function") {
      throw "callback must be a functtion";
    }
    return true;
  }

  getTodos(callback) {

    if (this.checkCallback(callback)) {
      this.Database.startConnection();
      this.Database.db.query('SELECT * FROM todo', (error, rows, fields) => {
        if (error) {
          throw  error;
        }
        let result = [];
        rows.map((item) => {
          result.push({...item})
        });

        callback(result);
      });
    }

  }

  getTodo(id, callback) {
    if (this.checkCallback(callback)) {
      this.Database.startConnection();
      let query = `SELECT * FROM todo WHERE id=${id} LIMIT 1`
      this.Database.db.query(query, (error, rows) => {
        if (error) {
          throw error;
        }
        let result = {...rows[0]}
        callback(result);
      })
    }
  }

  deleteTodo(id, callback) {
    if (this.checkCallback(callback)) {
      this.Database.startConnection();
      let query = `DELETE FROM todo WHERE id=${id}`
      this.Database.db.query(query, (error, rows) => {
        if (error) {
          throw error;
        }
        callback("Delete Data Success");
      })
    }
  }

  flushTodo(callback) {
    if (this.checkCallback(callback)) {
      this.Database.startConnection();
      let query = `TRUNCATE TABLE todo`
      this.Database.db.query(query, (error, rows) => {
        if (error) {
          throw error;
        }
        callback("Flush Data Success");
      })
    }
  }

  flushTodo(callback) {
    if (this.checkCallback(callback)) {
      this.Database.startConnection();
      let query = `TRUNCATE TABLE todo`
      this.Database.db.query(query, (error, rows) => {
        if (error) {
          throw error;
        }
        callback("Flush Data Success");
      })
    }
  }

  createTodo(todo, callback) {
    if (this.checkCallback(callback)) {
      this.Database.startConnection();
      let query = `INSERT INTO todo(name) VALUES('${todo.name}')`
      this.Database.db.query(query, (error, rows) => {
        if (error) {
          throw error;
        }
        callback("Create Data Success");
      })
    }
  }

  doneTodo(id, callback) {
    if (this.checkCallback(callback)) {
      this.Database.startConnection();
      let query = `SELECT * FROM todo WHERE id=${id} LIMIT 1`
      this.Database.db.query(query, (error, rows) => {
        if (error) {
          throw error;
        }
        let done = rows[0].done;
        let queryUpdate = `UPDATE todo SET done=${!done} WHERE id=${id}`
        this.Database.db.query(queryUpdate, (error, rows) => {
          if (error) {
            throw error;
          }
          callback("Update Data Success");
        });
      })
    }
  }

}

