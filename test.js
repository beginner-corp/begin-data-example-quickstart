let test = require('tape')
let arc = require('@architect/architect')
let data = require('@begin/data')

test('env', async t=> {
  t.plan(1)
  end = await arc.sandbox.start()
  t.ok('started sandbox')
})

test('api', t=> {
  t.plan(3)
  t.ok(data.get, 'data.get')
  t.ok(data.set, 'data.set')
  t.ok(data.destroy, 'data.destroy')
})

let table = 'trees'
let name = 'cedar'

test('data.set', async t=> {
  t.plan(1)
  let result = await data.set({table, name})
  t.ok(result.hasOwnProperty('key'), 'saved tree')
  console.log(result)
})

test('data.get', async t=> {
  t.plan(1)
  let result = await data.get({table})
  t.ok(result[0].name === name, 'got tree')
  console.log(result)
})

test('data.destroy', async t=> {
  t.plan(1)
  let result = await data.get({table})
  await data.destroy(result[0])
  let count = await data.count({table})
  t.ok(count === 0, 'no more tree, alas')
})

test('shutdown', t=> {
  t.plan(1)
  end()
  t.ok(true, 'shutdown sandbox')
})
