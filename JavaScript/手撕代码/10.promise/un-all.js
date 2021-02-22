/**
 * 反向all
 * 所有reject才reject
 * 一个resolve就resolve
 */

Promise.prototype.unAll = (promiseArr) => {
  return new Promise((resolve, reject) => {
    const resList = []
    for (let i = 0; i < promiseArr.length; i++) {
      const promiseItem = promiseArr[i];
      promiseItem.then(value => {
        resolve(value)
      }, err => {
        resList.push(err)
        if (index === promiseArr.length - 1) {
          reject(resList)
        }
      })
    }
  })
}
