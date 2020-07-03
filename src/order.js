const payment = require('./payment')

const order = {
  process (orderNumber) {
    const result = payment.charge(orderNumber)
    return { result, orderNumber }
  }
}

module.exports = order
