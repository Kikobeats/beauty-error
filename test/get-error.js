'use strict'

const test = require('ava')
const { getError } = require('..')

test('get error from native error', t => {
  const error = getError(new Error('my error'))
  t.true(error instanceof Error)
  t.is(error.message, 'my error')
  t.true(!!error.stack)
})

test('get error from string', t => {
  const error = getError('my error')
  t.true(error instanceof Error)
  t.is(error.message, "'my error'")
  t.true(!!error.stack)
})
