const fs = require('fs')
const { IO } = require('ramda-fantasy')

const readFile = s => IO(() => fs.readFileSync(s, 'utf8'))
const output = s => IO(() => console.log(s))

module.exports = {
  readFile,
  output,
  runIO: IO.runIO
}
