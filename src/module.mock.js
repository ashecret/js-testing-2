// console.log(require.cache)

const paymentModulePath  = require.resolve('./payment') // get full path
// console.log(paymentModulePath) 
require.cache[paymentModulePath] = {
  id: paymentModulePath,
  filename: paymentModulePath,
  loaded: true,
  exports: {
    charge: fn(() => true)
  }
}

const assert = require('assert')
const order = require('./order')
const payment = require('./payment')

const defaultFn = () => {}
function fn (impl = defaultFn) {
  const mockFn = (...args) => {
    mockFn.mock.calls.push(args)
    return impl(...args)
  }
  mockFn.mock = { calls: []}
  mockFn.mockImplementation = (newImpl => (impl = newImpl))
  return mockFn
}

test('should fail processing order charging card', () => {
  const orderNumber = 5
  const orderResult = order.process(orderNumber)

  expect(payment.charge).toHaveBeenCalledTimes(1)
  assert.deepStrictEqual(orderResult, { result: true, orderNumber })

  // Cleanup
  delete require.cache[paymentModulePath]
})
