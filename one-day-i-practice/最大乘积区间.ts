/**
 * 给定一个正整数数列a, 对于其每个区间, 我们都可以计算一个X值; 
 * X值的定义如下: 对于任意区间, 其X值等于区间内最小的那个数乘上区间内所有数和; 
 * 现在需要你找出数列a的所有区间中, X值最大的那个区间; 如数列a为: 3 1 6 4 5 2; 
 * 则X值最大的区间为6, 4, 5, X = 4 * (6+4+5) = 60;
 */
export function maxMult(nums: number[]): number {
  let maxRange = [0]
  for (let i = 0; i < nums.length; i++) {
    const numsItem = nums[i]
    let left: number = i - 1
    let right: number = i + 1
    const range = [nums[i]]
    while (left > 0 && nums[left] > numsItem) {
      range.unshift(nums[left])
      left--
    }
    while (right < nums.length && nums[right] > numsItem) {
      range.push(nums[right])
      right++
    }
    if (sum(range) > sum(maxRange)) {
      maxRange = range
    }
  }
  return sum(maxRange)
}

function sum(nums: number[]): number {
  return nums.reduce<number>((prev, curr) => {
    return prev + curr
  }, 0)
}
