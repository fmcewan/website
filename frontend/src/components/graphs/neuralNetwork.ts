import type { Graph } from './types'
import { W, H } from './types'

export function neuralNetwork(): Graph {
  const layers = [3, 5, 5, 4, 2]
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const xStep = W / (layers.length + 1)
  layers.forEach((count, li) => {
    const x = xStep * (li + 1)
    const yStep = H / (count + 1)
    for (let ni = 0; ni < count; ni++)
      nodes.push({
        x: x + (Math.random() - 0.5) * 20,
        y: yStep * (ni + 1) + (Math.random() - 0.5) * 10,
        r: 3 + Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.4,
      })
  })
  for (let li = 0; li < layers.length - 1; li++) {
    const ls = layers.slice(0, li).reduce((a, b) => a + b, 0)
    const ns = ls + layers[li]
    for (let a = ls; a < ns; a++)
      for (let b = ns; b < ns + layers[li + 1]; b++)
        if (Math.random() > 0.2) edges.push({ a, b, opacity: 0.15 + Math.random() * 0.25 })
  }
  return { nodes, edges }
}
