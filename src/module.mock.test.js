const assert = require('assert')
const order = require('./order')
const payment = require('./payment')

jest.mock('./payment', () => {
  return  {
    charge: jest.fn(() => false)
  }
})

test('should fail processing order charging card', () => {
  const orderNumber = 5
  const orderResult = order.process(orderNumber)

  // expect(payment.charge).toHaveBeenCalled()
  // expect(payment.charge).toHaveBeenCalledWith(orderNumber)
  expect(payment.charge.mock.calls).toEqual([ [ 5 ] ])
  assert.deepStrictEqual(orderResult, { result: false, orderNumber })
  payment.charge.mockReset()
})
