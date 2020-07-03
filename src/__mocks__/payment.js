module.exports = {
  charge: jest.fn(() => {
    console.log('running mock')
    return false
  })
}