const assert = require('assert')
const _ = require('lodash')
const vk = require('../index')
const search = vk.search

describe('binary search', function () {
  it('returns null for an empty list', function () {
    const index = search.binary([], 1)
    assert.equal(index, null)
  })

  it('returns null for target not in list', function () {
    const index = search.binary([1, 2, 3, 4, 5, 6, 7], 8)
    assert.equal(index, null)
  })

  it('finds all targets in lists of length [1,100]', function () {
    const maxSize = 1e2
    const skip = 1

    // Generate lists of size [1,maxSize]
    for (let size = 1; size <= maxSize; size += skip) {
      const list = _.range(0, size, skip)

      for (let find = 0; find < list.length; find += skip) {
        const index = search.binary(list, find)
        assert.equal(find, list[index])
      }
    }
  })

  it('finds values in O(lg(n)) time', function () {
    const maxSize = 1e3
    const skip = 100

    // Generate lists of size [skip,maxSize]
    for (let size = skip; size <= maxSize; size += skip) {
      const list = _.range(0, size)
      let maxCompares = 0

      for (let find = 0; find < size; ++find) {
        let compares = 0

        const index = search.binary(list, find, function (candidate, target) {
          maxCompares = Math.max(maxCompares, ++compares)

          if (target < candidate) {
            return -1
          } else if (target > candidate) {
            return 1
          } else {
            return 0
          }
        })

        assert.equal(find, list[index], 'found the target value')

        assert(maxCompares <= Math.floor(Math.log2(size)) + 1,
          'maxCompares <= log2(list_size) + 1')
      }
    }
  })
})
