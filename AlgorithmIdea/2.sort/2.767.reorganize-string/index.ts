function reorganizeString(S: string) {
  const map = {}
  const res = []
  const len0p5 = S.length / 2 + 1
  for (let i = 0; i < S.length; i++) {
    if (map[S[i]]) {
      map[S[i]] += 1
      // 不能组成相邻不同
      if (map[S[i]] >= len0p5) {
        return ''
      }
    } else {
      map[S[i]] = 1
    }
  }
  const enList: any[] = (Object as any).entries(map)
  enList.sort((a, b) => b[1] - a[1])
  let resIndex = 0
  let i = 0
  // 填充偶数位
  while(resIndex < S.length) {
    if (enList[i][1] > 0) {
      res[resIndex] = enList[i][0]
      resIndex += 2
      enList[i][1] -= 1
    // 出现次数最多的字符填不满偶数位了，取出现次数第二多的字符
    } else {
      i += 1
    }
  }
  // 填充奇数位
  resIndex = 1
  while (resIndex < S.length) {
    if (enList[i][1] > 0) {
      res[resIndex] = enList[i][0]
      resIndex += 2
      enList[i][1] -= 1
    } else {
      i += 1
    }
  }
}
