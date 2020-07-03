const { sum, sumAsync } = require('./math')

test('should add numbers sync', () => {
  const result = sum(5, 3)
  const expected = 8
  expect(result).toBe(expected)
})

test('should add numbers async', async () => {
  const result = await sumAsync(4, 3)
  const expected = 7
  expect(result).toBe(expected)
})
