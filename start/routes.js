'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

const Route = use('Route')

Route.on('/').render('welcome')
Route.group(() => {
  Route.get('/', 'TodoController.index')
  Route.get('/:id', 'TodoController.show')
  Route.post('create', 'TodoController.create')
  Route.get('done/:id', 'TodoController.done')
  Route.get('delete/:id', 'TodoController.delete')
}).prefix('todo')
