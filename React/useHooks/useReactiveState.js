import React from 'react'
import { useForceUpdate } from './useForceUpdate'

function useReactiveState(initValue) {
  const update = useForceUpdate()
  const reactive = React.useMemo(() => {
    const box = {
      state: initValue,
      setState(v) {
        box.state = v
        update()
      }
    }
    return box
  }, [initValue])

  return [reactive.state, reactive.setState]
}
