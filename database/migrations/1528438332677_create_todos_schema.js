'use strict'

const Schema = use('Schema')

class CreateTodosSchema extends Schema {
  up() {
    this.create('todos', (table) => {
      table.increments()
      table.string('todo', 100).notNullable()
      table.boolean('done').notNullable().default(false)
      table.timestamps()
      table.index('done')
    })
  }

  down() {
    this.drop('todos')
  }
}

module.exports = CreateTodosSchema
