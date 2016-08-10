const {
  T, addIndex, always, assoc, concat, cond, contains, curry, dec,
  equals, inc, length, map, over, pipe, range, reduce, view
} = require('ramda')
const lens = require('./lens')
const reduceWithIndex = addIndex(reduce)

const input = x => {
  return pipe(
    view(lens.robots),
    length,
    range(0),
    map(n => view(lens.instructions(n), x)),
    reduceWithIndex(processInstructions, x)
  )(x)
}

const processInstructions = (input, instructions, index) => {
  return reduce(processInstruction(index), input, instructions)
}

const processInstruction = curry((index, input, instruction) => {
  return cond([
    [ 
      _ => view(lens.isLost(index), input),
      _ => input
    ], 
    [ equals('L'), _ => over(lens.direction(index), turnLeft, input) ],
    [ equals('R'), _ => over(lens.direction(index), turnRight, input) ],
    [ equals('F'), _ => moveForward(input, index) ],
    [ T, always(input) ]
  ])(instruction)
})

const turnLeft = cond([
  [ equals('N'), always('W') ],
  [ equals('W'), always('S') ],
  [ equals('S'), always('E') ],
  [ equals('E'), always('N') ]
])

const turnRight = cond([
  [ equals('N'), always('E') ],
  [ equals('W'), always('N') ],
  [ equals('S'), always('W') ],
  [ equals('E'), always('S') ]
])

const moveForward = (input, index) => {
  const direction = view(lens.direction(index), input)
  const position = view(lens.position(index), input)
  const scents = view(lens.scents, input)
  const maxX = view(lens.maxX, input)
  const maxY = view(lens.maxY, input)
  const x = view(lens.x(index), input)
  const y = view(lens.y(index), input)
  return cond([
    [ 
      _ => contains(position, scents),
      _ => input
    ], 
    [ 
      direction => equals('N', direction) && maxY > y,
      _ => over(lens.y(index), inc, input)
    ], 
    [ 
      direction => equals('S', direction) && y > 0,
      _ => over(lens.y(index), dec, input)
    ], 
    [ 
      direction => equals('E', direction) && maxX > x,
      _ => over(lens.x(index), inc, input)
    ], 
    [ 
      direction => equals('W', direction) && x > 0,
      _ => over(lens.x(index), dec, input)
    ], 
    [ T, _ => pipe(
      over(lens.isLost(index), T),
      assoc('scents', concat(scents, [position]))
    )(input) ]
  ])(direction)
}

module.exports = {
  input
}
