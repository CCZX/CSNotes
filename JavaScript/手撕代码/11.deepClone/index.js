function deepClone(target) {
  let res
  if (Array.isArray(target)) {
    res = []
  } else if (target && typeof target === 'object') {
    res = {}
  } else {
    return target
  }

  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const value = target[key]
      if (value && typeof value === 'object') {
        res[key] = deepClone(value)
      } else {
        res[key] = value
      }
    }
  }

  return res
}