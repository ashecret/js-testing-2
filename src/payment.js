const payment = {
  charge(orderNumber) {
    console.log(`***** processing payment for orderNumber ${orderNumber} *****`)
    return true
  }
}

module.exports = payment
