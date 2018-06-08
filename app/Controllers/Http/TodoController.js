'use strict'

const Todos      = use('App/Models/Todos')
const {validate} = use('Validator')

class TodoController {

  async index({request, response}) {
    try {
      await Todos.firstOrFail()
      const todos = await Todos.all()
      return response.status(200)
                     .json({message: 'success', status: 200, data: todos})
    }
    catch (exception) {
      return response.status(404)
                     .json({message: 'error', status: 404})
    }
  }
}

module.exports = TodoController
