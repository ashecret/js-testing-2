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

test('should charge card and return true', () => {
  // payment.charge = fn(() => true)
  payment.charge = fn()
  payment.charge.mockImplementation(() => true)

  const orderNumber = 3
  const result = order.process(orderNumber)

  assert.deepStrictEqual(result,{ result: true, orderNumber })
  assert.deepStrictEqual(payment.charge.mock.calls, [ [ 3 ] ])
  expect(payment.charge).toHaveBeenCalledTimes(1)
})

function spyOn(obj, prop) {
  const originalValue = obj[prop]
  obj[prop] = fn()
  obj[prop].mockRestore = () => (obj[prop] = originalValue)
  return obj[prop]
}

test('should fail processing order charging card', () => {
  const paymentSpy = spyOn(payment, 'charge')
  paymentSpy.mockImplementation(() => false)

  const orderNumber = 5
  const orderResult = order.process(orderNumber)

  expect(paymentSpy).toHaveBeenCalledTimes(1)
  // expect(paymentSpy).toHaveBeenCalledWith(orderNumber)
  assert.deepStrictEqual(orderResult, { result: false, orderNumber })

  paymentSpy.mockRestore()
})
