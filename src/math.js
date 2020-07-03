// intentionaly broken
const sum = (a, b) => a + b

// pointless, just to simulate async function
const sumAsync = (...args) => Promise.resolve(sum(...args))

module.exports = { sum, sumAsync }
