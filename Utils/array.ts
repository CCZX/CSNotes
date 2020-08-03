
/**
 * 将带有ID的对象数组转为以ID为key的对象
 * @param arr 
 */
const converseArrToObj = (arr) => {
  return arr.reduce((obj, item) => {
    obj[item.id] = item
    return obj
  }, {})
}