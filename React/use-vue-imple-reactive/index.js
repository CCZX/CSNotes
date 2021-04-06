import { reactive, effect } from '@vue/reactivity'
import { useRef, useEffect, useMemo, useState } from 'react'

export function useReactive(initState) {
  const reactiveState = useRef(initState) // state 
  const [, forceUpdate] = useState(0)
  const state = useMemo(() => reactive(reactiveState.current), [reactiveState.current])
  useEffect(() => {
    let isdep = false
    effect(() => {
      for (let i in state) { state[i] } //依赖收集
      isdep && forceUpdate(num => num + 1)  // 强制更新
      if (!isdep) isdep = true
    })
  }, [state])
  return state
}

export function reactiveHoc(Component) {
  const self_componentDidMount = Component.prototype.componentDidMount
  return class WrapComponent extends Component {
    constructor(props) {
      super(props)
      this.state = reactive(this.state)
    }
    __isFirst = false
    componentDidMount() {
      effect(() => {
        for (let i in this.state) { this.state[i] }  //构建响应式
        this.__isFirst && this.forceUpdate()
        !this.__isFirst && (this.__isFirst = true)
      })
      self_componentDidMount && self_componentDidMount.call(this)
    }
  }
}

// https://juejin.cn/post/6947835848813445128
