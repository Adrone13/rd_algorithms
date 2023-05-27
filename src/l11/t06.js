/**
 * Є неорієнтований (або двонаправлений) ациклічний граф, що складається з N вершин.
 * Кожна вершина пронумерована від 1 до N.
 * Потрібно визначити, чи є шлях з вершини A до вершини B.
 * На вхід подається список ребер у вигляді [from, to] (що в неорієнтованій графі означає, що також існує [to, from]).
 * Якщо шлях є повернути True, інакше - False.
 */

function printMatrix(matrix) {
  console.log('[');
  matrix.forEach(e => console.log('  ' + e));
  console.log(']');
}

function isReachable(n, edges, a, b) {
  const graph = Array.from(new Array(n + 1), () => new Array(n + 1).fill(0));

  printMatrix(graph);

  const graph1 = new Array(n + 1);
  for (let i = 0; i < graph1.length; i++) {
    graph1[i] = new Array(graph1.length).fill(0);
  }
  printMatrix(graph1);

  for (let i = 0; i < edges.length; i++) {
    const currentEdge = edges[i];
    const vertexFrom = currentEdge[0];
    const vertexTo = currentEdge[1];

    graph[vertexFrom][vertexTo] = 1;
    graph[vertexTo][vertexFrom] = 1;
  }

  printMatrix(graph);

  // console.log(a, b);

  return dfsSearch(graph, a, b);
}

const dfsSearch = (graph, from, to, visited = []) => {
  console.log("Visiting vertex #" + from);

  if (from === to) {
    console.log('found');

    return true;
  }

  visited[from] = true;

  const currVertexEdges = graph[from];

  for (let i = 0; i < currVertexEdges.length; i++) {
    if (currVertexEdges[i] === 1 && !visited[i]) {
      return dfsSearch(graph, i, to, visited);
    }
  }

  return false;
}

const testCases = [
  { input: [3, [[1, 2], [2, 3], [1, 3]], 1, 3], expected: true },
  { input: [5, [[1, 2], [2, 3], [1, 3], [4, 5]], 1, 5], expected: false },
  { input: [5, [[1, 2], [2, 3], [3, 5], [4, 5]], 1, 4], expected: true },
  { input: [6, [[1, 2], [2, 6], [1, 5], [3, 5], [5, 4]], 3, 6], expected: true },
  { input: [6, [[1, 2], [2, 6], [3, 4], [3, 5], [5, 4]], 3, 6], expected: false }
];

// const { input, expected } = testCases[0];

// console.log('Expected:', expected, 'Received:', isReachable(...input));

const { test } = require('../utils/test');

test(isReachable, testCases);
