
// -----------------------------------
// Binary search

function binaryComparator(candidate, target) {
  if (target < candidate) {
    return -1
  } else if (target > candidate) {
    return 1
  } else {
    return 0
  }
}

function binarySearch(sortedList, target, low, high, comparator) {
  if (high < low) {
    return null
  }

  const mid = Math.floor(low + ((high-low) / 2))
  const result = comparator(sortedList[mid], target)

  if (result === 0) {
    return sortedList[mid]
  } else if (result < 0) {
    return binarySearch(sortedList, target, low, mid-1, comparator)
  } else {
    return binarySearch(sortedList, target, mid+1, high, comparator)
  }
}

const search = {

  binary(sortedList, target, comparator=binaryComparator) {
    return binarySearch(sortedList, target, 0, sortedList.length-1, comparator)
  },

  tween(sortedList, time, comparator=tweenComparator) {
    return tweenSearch(sortedList, time, 0, sortedList.length - 1, comparator)
  }
}

exports.search = search
