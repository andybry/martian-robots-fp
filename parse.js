const { 
  F, always, applySpec, head, map, pipe, prop, split, splitEvery, 
  tail, trim
} = require('ramda')

const bounds = pipe(
  head,
  split(/\s+/),
  applySpec({
    x: pipe(prop(0), parseInt),
    y: pipe(prop(1), parseInt)
  })
)

const position = pipe(
  split(/\s+/),
  applySpec({
    x: pipe(prop(0), parseInt),
    y: pipe(prop(1), parseInt),
    direction: prop(2)
  })
)

const robots = pipe(
  tail,
  splitEvery(2),
  map(applySpec({
    position: pipe(prop(0), position),
    instructions: pipe(prop(1), split('')),
    isLost: F
  }))
)

const input = pipe(
  trim,
  split('\n'),
  applySpec({
    bounds: bounds,
    robots: robots,
    scents: always([])
  })
)

module.exports = {
  input
}
