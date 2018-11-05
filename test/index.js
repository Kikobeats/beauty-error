'use strict'

const test = require('ava')
const prettifyError = require('..')

test('pretty an error', t => {
  const error = new Error("Hello darkness my old' friend")
  t.snapshot(prettifyError(error))
})
