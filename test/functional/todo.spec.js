'use strict'

const {test, trait} = use('Test/Suite')('Todo')
const Todos         = use('App/Models/Todos')

trait('Test/ApiClient')

test('get Todo With Empty Data Shall Return 404', async ({client}) => {
  await Todos.truncate()
  const response = await client.get('/todo').end()
  response.assertStatus(404)
  response.assertJSON({
    "message": "error",
    "status" : 404,
  })
}).timeout(0)


test('get Todo With Data Shall Return 200', async ({client}) => {
  await Todos.create({todo: "test todo1"})
  const response = await client.get('/todo').end()
  response.assertStatus(200)
  response.assertJSON({
    "message": "success",
    "status" : 200,
    "data"   : [
      {
        "id"  : 1,
        "todo": "test todo1",
        "done": false
      }
    ]
  })
}).timeout(0)
