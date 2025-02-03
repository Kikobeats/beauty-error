'use strict'

const test = require('ava')
const { cleanError } = require('..')

test("don't fail if stack can't be reassigned", t => {
  const error = new Error('my error')

  Object.defineProperty(error, 'stack', {
    configurable: false,
    writable: false,
    enumerable: true,
    value: 'foo'
  })

  const cleanedError = cleanError(error)
  t.is(cleanedError.stack, 'foo')
})
