'use strict'

const { flow, isNil, castArray, first } = require('lodash')
const PrettyError = require('pretty-error')
const cleanStack = require('clean-stack')
const isIterable = require('is-iterable')

const DEFAULT_PRETTY = {
  // this is a simple selector to the element that says 'Error'
  'pretty-error > header > title > kind': {
    background: 'none',
    color: 'bright-red',
    marginRight: 1
  },

  'pretty-error > header > colon': {
    display: 'none'
  },

  'pretty-error > header > message': {
    color: 'grey'
  },

  'pretty-error > trace > item > header > pointer > file': {
    color: 'grey'
  },

  'pretty-error > trace > item > header > pointer > colon': {
    color: 'grey'
  },

  'pretty-error > trace > item > header > pointer > line': {
    color: 'grey'
  },

  'pretty-error > trace > item > header > what': {
    color: 'grey'
  }
}

const createPretty = opts => {
  const pretty = new PrettyError()
  pretty.appendStyle(opts)
  return pretty
}

const pretty = createPretty(DEFAULT_PRETTY)

const getPretty = opts => (isNil(opts) ? pretty : createPretty(opts))

const beautyError = (error, opts) => {
  const stack = cleanStack(error.stack)
  const cleanError = { ...error, stack }
  const pretty = getPretty(opts)
  return pretty.render(cleanError)
}

const getError = genericError =>
  first(
    isIterable(genericError)
      ? Array.from(genericError)
      : castArray(genericError)
  )

module.exports = flow([getError, beautyError])
module.exports.beauty = beautyError
