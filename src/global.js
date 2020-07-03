async function test(title, callback) {
  try {
    await callback()
    console.log(`✅ ${title}`)
  } catch (error) {
    console.error(`❌ ${title}`)
    console.error(error)
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`${actual} is not equal to ${expected}`)
      }
    },
    // write after function with calls have been written
    toHaveBeenCalledTimes (expected) {
      if (expected !== actual.mock.calls.length) {
        throw new Error(`expected ${expected}, but received ${actual.mock.calls.length}`)
      }
    }
  }
}


global.test = test
global.expect = expect
