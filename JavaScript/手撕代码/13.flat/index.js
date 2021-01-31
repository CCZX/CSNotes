/**
 * 
 * @param {Array} arr 
 */
const useReduceFlat = (arr) => {
  return arr.reduce((prev, curr) => {
    if (Array.isArray(curr)) {
      return [...prev, ...useReduceFlat(curr)]
    }
    return [...prev, curr]
  }, [])
}

console.log(useReduceFlat([1, [2, [3]]]))

const useStackFlat = (arr) => {
  const stack = [...arr]
  const result = []
  while (stack.length) {
    const node = stack.pop()
    if (Array.isArray(node)) {
      stack.push(...node)
    } else {
      result.unshift(node)
    }
  }
  return result
}

console.log(useStackFlat([1, [2, [3]]]))

const flatWithLevel = (arr, level = Infinity) => {
  if (level < 1) {
    return arr.slice()
  }
  return arr.reduce((prev, curr) => {
    if (Array.isArray(curr)) {
      return [...prev, ...flatWithLevel(curr, level - 1)]
    }
    return [...prev, curr]
  }, [])
}

console.log(flatWithLevel([1, [2, [3]]], 0))
console.log(flatWithLevel([1, [2, [3]]]))
