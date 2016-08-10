const {
  applySpec, join, map, pipe, view
} = require('ramda')
const lens = require('./lens')

const robot = pipe(
  applySpec({
    x: view(lens.relX),
    y: view(lens.relY),
    isLost: view(lens.relIsLost),
    direction: view(lens.relDirection)
  }),
  o => `${o.x} ${o.y} ${o.direction} ${o.isLost ? 'LOST' : ''}`
)

const calculate = pipe(
  view(lens.robots),
  map(robot),
  join('\n')
)

module.exports = {
  calculate
}
