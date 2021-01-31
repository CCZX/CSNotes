const graph = {
  "A": ["B", "C"],
  "B": ["A", "C", "D"],
  "C": ["A", "B", "D", "E"],
  "D": ["B", "C", "E", "F"],
  "E": ["C", "D"],
  "F": ["D"],
}

const DFS = (graph, s) => {
  const stack = []
  const visited = []
  stack.push(s)
  visited.push(s)
  while (stack.length) {
    const vertex = stack.pop()
    const nodes = graph[vertex]
    for (const node of nodes) {
      if (!visited.includes(node)) {
        stack.push(node)
        visited.push(node)
      }
    }
    console.log(vertex)
  }
}

DFS(graph, 'A')
