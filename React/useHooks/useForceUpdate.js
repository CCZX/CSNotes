import React from 'react'

// 强制更新
export function useForceUpdate() {
  const [, set] = React.useState(false)
  return React.useCallback(() => {
    set(v => !v)
  }, [])
}