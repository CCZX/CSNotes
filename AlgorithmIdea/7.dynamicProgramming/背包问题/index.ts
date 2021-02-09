const weight = [0, 2, 3, 4, 5, 9]
const value = [0, 3, 4, 5, 8, 10]
const capacity = 20

const kanpsack = () => {
  const count = weight.length - 1
  const dp = Array(count + 1).fill(0).map(() => Array(capacity + 1).fill(0))

  for (let k = 1; k <= count; k++) {
    for (let c = 1; c <= capacity; c++) {
      if (weight[k] > c) {
        dp[k][c] = dp[k - 1][c]
      } else {
        const value1 = dp[k - 1][c]
        const value2 = dp[k - 1][c - weight[k]] + value[k]
        dp[k][c] = Math.max(value1, value2)
      }
    }
  }

  return dp[count][capacity]
}
