const numberOfArithmeticSlices = function(A: number[]): number {
  const dp = [0, 0]
  let res = 0
  for (let i = 2; i < A.length; i++) {
    if (A[i] - A[i-1] === A[i-1] - A[i-2]) {
      dp[i] = dp[i-1] + 1
    } else {
      dp[i] = 0
    }
    res += dp[i]
  }
  return res
};
numberOfArithmeticSlices([1,2,3,4])
