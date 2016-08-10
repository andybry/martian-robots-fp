const { 
  compose, lensIndex, lensPath, lensProp, 
} = require('ramda')

const robots = lensProp('robots')

const robot = index => compose(
  lensProp('robots'),
  lensIndex(index)
)

const scents = lensProp('scents')

const position = index => compose(
  robot(index),
  lensProp('position')
)

const relDirection = lensPath([ 'position', 'direction' ])
const direction = index => compose(
  robot(index),
  relDirection
)

const instructions = index => compose(
  robot(index),
  lensProp('instructions')
)

const relX = lensPath([ 'position', 'x' ])
const x = (index) => compose(
  robot(index),
  relX
)

const relY = lensPath([ 'position', 'y' ])
const y = (index) => compose(
  robot(index),
  relY
)

const relIsLost = lensProp('isLost')
const isLost = (index) => compose(
  robot(index),
  relIsLost
)

const maxX = compose(
  lensProp('bounds'),
  lensProp('x')
)

const maxY = compose(
  lensProp('bounds'),
  lensProp('y')
)

module.exports = {
  robots,
  robot,
  scents,
  position,
  relDirection,
  direction,
  instructions,
  relX,
  x,
  relY,
  y,
  relIsLost,
  isLost,
  maxX,
  maxY
}
