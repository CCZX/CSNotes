/**
 * 实现reactHooks
 */

const memorizedState = []
let cursor = 0

function useState(init) {
  memorizedState[cursor] = memorizedState[cursor] || init
  const currentCursor = cursor

  function setState(newState) {
    memorizedState[currentCursor] = newState
    render()
  }

  return [memorizedState[cursor++], setState]
}

function useEffect(cb, deps) {
  const noDep = !deps
  if (noDep) {
    cb()
    cursor++
    return
  }
  const oldDeps = memorizedState[cursor]
  const isChanged = !oldDeps.every((item, index) => item === oldDeps[index])
  if (isChanged) {
    cb()
    memorizedState[cursor] = deps
  }
  cursor++
}

// https://github.com/brickspert/blog/issues/26

