'use strict'

const Model = use('Model')

class Todos extends Model {

  static get table() {
    return 'todos'
  }

  static get hidden() {
    return ['created_at', 'updated_at']
  }

  getDone(done) {
    return done ? true : false
  }

}

module.exports = Todos
