'use strict'

const test = require('ava')
const beautyError = require('..')

test('pretty an error', t => {
  t.snapshot(beautyError(new Error("Hello darkness my old' friend")))
})
