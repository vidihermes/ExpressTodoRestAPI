'use strict'

const Todos           = use('App/Models/Todos')
const {validate}      = use('Validator')
const {HttpException} = use('@adonisjs/generic-exceptions')
const allowedKey      = ['todo']

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
                     .json({message: 'data does not exists', status: 404})
    }
  }

  async show({request, response, params}) {
    try {
      const todo = await Todos.findOrFail(params.id)
      return response.status(200)
                     .json({message: 'success', status: 200, data: todo})
    } catch (exception) {
      return response.status(404)
                     .json({message: 'data does not exists', status: 404})
    }
  }

  async create({request, response}) {
    try {
      const rules      = {todo: 'required|min:10|max:100'}
      const validation = await validate(request.all(), rules)
      if (validation.fails()) {
        throw new HttpException(validation.messages()[0]['message'])
      }
      await Todos.create(request.only(allowedKey))
      return response.status(200)
                     .json({message: 'success', status: 200})
    } catch (exception) {
      return response.status(404)
                     .json({message: exception.message, status: 404})
    }
  }

  async done({request, response, params}) {
    try {
      const todo = await Todos.findOrFail(params.id)
      todo.done  = !todo.done
      await todo.save()
      return response.status(200)
                     .json({message: 'success', status: 200})
    } catch (exception) {
      return response.status(404)
                     .json({message: 'data does not exists', status: 404})
    }
  }

  async delete({request, response, params}) {
    try {
      const todo = await Todos.findOrFail(params.id)
      await todo.delete()
      return response.status(200)
                     .json({message: 'success', status: 200})
    } catch (exception) {
      return response.status(404)
                     .json({message: 'data does not exists', status: 404})
    }
  }

}

module.exports = TodoController
