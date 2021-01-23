Promise.myAll = (arr) => {
  return new Promise((resolve) => {
    const list = []
    arr.forEach((item, index) => {
      item.then(res => {
        list[index] = res
      })
      if (index === arr.length) {
        resolve(list)
      }
    })
  }).catch(err => {
    throw new Error(err)
  })
}
