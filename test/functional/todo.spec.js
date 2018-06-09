'use strict'

const {test, trait} = use('Test/Suite')('Todo')
const Todos         = use('App/Models/Todos')

trait('Test/ApiClient')

test('get Index With Empty Data Shall Return 404', async ({client}) => {
  await Todos.truncate()
  const response = await client.get('/todo').end()
  response.assertStatus(404)
  response.assertJSON({
    "message": "data does not exists",
    "status" : 404
  })
}).timeout(0)


test('get Index With Data Shall Return 200', async ({client}) => {
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

test('get single todo With Empty Data Shall Return 404', async ({client}) => {
  await Todos.truncate()
  const response = await client.get('/todo/1').end()
  response.assertStatus(404)
  response.assertJSON({
    "message": "data does not exists",
    "status" : 404
  })
}).timeout(0)


test('get single todo With Data Shall Return 200', async ({client}) => {
  await Todos.create({todo: "test todo1"})
  const response = await client.get('/todo/1').end()
  response.assertStatus(200)
  response.assertJSON({
    "message": "success",
    "status" : 200,
    "data"   : {
      "id"  : 1,
      "todo": "test todo1",
      "done": false
    }
  })
}).timeout(0)

test('call create with empty data shall return 404', async ({client}) => {
  const response = await client.post('/todo/create').send({}).end()
  response.assertStatus(404)
}).timeout(0)

test('call create with valid data shall return 200', async ({client}) => {
  await Todos.truncate()
  let response = await client.post('/todo/create').send({todo: 'this is my first todo'}).end()
  response.assertStatus(200)
  response = await client.get('/todo/1').end()
  response.assertStatus(200)
  response.assertJSON({
    "message": "success",
    "status" : 200,
    "data"   : {
      "id"  : 1,
      "todo": "this is my first todo",
      "done": false
    }
  })
}).timeout(0)

test('call done with wrong id shall return 404', async ({client}) => {
  const response = await client.get('/todo/done/5').end()
  response.assertStatus(404)
}).timeout(0)

test('call done with valid id shall return 200', async ({client}) => {
  let response = await client.get('/todo/done/1').end()
  response.assertStatus(200)
  response = await client.get('/todo/1').end()
  response.assertStatus(200)
  response.assertJSON({
    "message": "success",
    "status" : 200,
    "data"   : {
      "id"  : 1,
      "todo": "this is my first todo",
      "done": true
    }
  })
}).timeout(0)

test('call delete with wrong id shall return 404', async ({client}) => {
  const response = await client.get('/todo/delete/5').end()
  response.assertStatus(404)
}).timeout(0)

test('call delete with valid id shall return 200', async ({client}) => {
  let response = await client.get('/todo/delete/1').end()
  response.assertStatus(200)
  response = await client.get('/todo/1').end()
  response.assertStatus(404)
}).timeout(0)