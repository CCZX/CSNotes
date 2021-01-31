const graph = {
  "A": ["B", "C"],
  "B": ["A", "C", "D"],
  "C": ["A", "B", "D", "E"],
  "D": ["B", "C", "E", "F"],
  "E": ["C", "D"],
  "F": ["D"],
}

// 使用队列实现BFS

const BFS = (graph, s) => {
  const queue = []
  const visited = []
  queue.push(s)
  visited.push(s)
  while (queue.length) {
    const vertex = queue.shift()
    const nodes = graph[vertex]
    for (const node of nodes) {
      if (!visited.includes(node)) {
        queue.push(node)
        visited.push(node)
      }
    }
    console.log(vertex)
  }
}

BFS(graph, 'A')
