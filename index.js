const { chain, map, pipe } = require('ramda')

const io = require('./io')
const parse = require('./parse')
const process = require('./process')
const output = require('./output')

const main = pipe(
  parse.input,
  process.input,
  output.calculate
)

pipe(
  io.readFile,
  map(main),
  chain(io.output),
  io.runIO
)('input.txt')
