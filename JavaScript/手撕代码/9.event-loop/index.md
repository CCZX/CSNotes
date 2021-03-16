## 浏览器线程：

- GUI：渲染进程。在执行JavaScript会被挂起
- JS引擎线程：处理JS脚本
- 定时任务触发器线程
- 事件触发器线程
- 异步任务线程：HTTP请求等

## event loop 协调各个线程

- 一开始script脚本作为宏任务执行
- 同步任务直接执行，宏任务进宏任务队列，微任务进微任务队列
- 当前宏任务执行完成情况微任务队列
- 执行UI渲染线程的工作，requestAnimationFrame在此执行
- 执行web work任务
- 执行完成本轮宏任务，重复第二步，直到情况宏任务队列和微任务队列

## 宏任务微任务

ES6 规范中，microtask 称为 jobs，macrotask 称为 task。宏任务是由宿主发起的，而微任务由JavaScript自身发起。

## node事件循环

timer -> setTimeout...
pending callback -> 执行延迟到下一个循环执行IO操作
idle，prepare -> 仅系统内部使用
poll -> 检索新的IO操作
check -> setImmediate
close callback
