/**
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function(grid) {
  const rows = grid.length
  const clos = grid[0].length
  const dp = Array(rows).fill([])

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < clos; j++) {
      if (i !== 0 && j !== 0) {
        dp[i][j] = Math.min(dp[i-1][j], dp[i][j-1]) + grid[i][j] 
      } else if (i === 0 && j !== 0) {
        dp[i][j] = grid[i][j] + dp[i][j-1]
      } else if (j === 0 && i !== 0) {
        dp[i][j] = grid[i][j] + dp[i-1][j]
      } else {
        dp[i][j] = grid[i][j]
      }
    }
  }
  return dp[rows-1][clos-1]
}