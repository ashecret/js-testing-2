const assert = require('assert')
const order = require('./order')
const payment = require('./payment')

test('should charge card and return true', () => {
  payment.charge = jest.fn((orderNumber) => true)
  // payment.charge = fn()
  // payment.charge.mockImplementation((orderNumber) => true)

  const orderNumber = 3
  const result = order.process(orderNumber)

  expect(result).toEqual({ result: true, orderNumber })
  expect(payment.charge).toHaveBeenCalledTimes(1)
  expect(payment.charge).toHaveBeenCalledWith(orderNumber)
  expect(payment.charge.mock.calls).toEqual([ [ 3 ] ])
  // clean up
  payment.charge.mockRestore()
})

test('should fail processing order charging card', () => {
  const paymentSpy = jest.spyOn(payment, 'charge')
  paymentSpy.mockImplementation(() => false)

  const orderNumber = 5
  const orderResult = order.process(orderNumber)

  expect(paymentSpy).toHaveBeenCalled()
  expect(paymentSpy).toHaveBeenCalledWith(orderNumber)

  expect(paymentSpy.mock.calls).toEqual([ [ 5 ] ])
  // use of assert for custom tool demo only
  assert.deepStrictEqual(orderResult, { result: false, orderNumber })

  // cleanup
  paymentSpy.mockRestore()
})
