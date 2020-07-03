const { sum, sumAsync } = require('./math')

test('should add numbers synchronously', () => {
  const result = sum(3, 7)
  const expected = 10
  expect(result).toBe(expected)
})

test('should add numbers asynchronously', async () => {
  const result = await sumAsync(3, 7)
  const expected = 10
  expect(result).toBe(expected)
})
