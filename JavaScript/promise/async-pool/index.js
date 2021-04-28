// ES7实现

async function asyncPool(limit, array, iteratorFn) {
  const task = []
  const execingTask = []

  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item))
    task.push(p)

    if (limit <= array.length) {
      const e = p.then(() => {
        execingTask.splice(executing.indexOf(e), 1)
      })
      execingTask.push(e)
      if (execingTask.length >= limit) {
        await Promise.race(execingTask)
      }
    }
  }

  return Promise.all(task)
}

const timeout = i => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(i)
    }, i)
  });
}
await asyncPool(2, [1000, 5000, 3000, 2000], timeout);
