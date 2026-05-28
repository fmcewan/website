import type { Graph } from './types'
import { W, H } from './types'

export function flow(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const cols = 7
  const xStep = (W - 80) / (cols - 1)
  const layers: number[][] = []

  for (let c = 0; c < cols; c++) {
    const count = 2 + Math.floor(Math.random() * 4)
    const layer: number[] = []
    const yStep = H / (count + 1)
    for (let i = 0; i < count; i++) {
      layer.push(nodes.length)
      nodes.push({
        x: 40 + c * xStep + (Math.random() - 0.5) * 15,
        y: yStep * (i + 1) + (Math.random() - 0.5) * 15,
        r: 2.5 + Math.random() * 2,
        opacity: 0.5 + Math.random() * 0.5,
      })
    }
    layers.push(layer)
  }

  for (let c = 0; c < cols - 1; c++) {
    const curr = layers[c]
    const next = layers[c + 1]
    curr.forEach(a => {
      const connections = 1 + Math.floor(Math.random() * 2)
      const shuffled = [...next].sort(() => Math.random() - 0.5).slice(0, connections)
      shuffled.forEach(b => edges.push({ a, b, opacity: 0.25 + Math.random() * 0.2 }))
    })
  }

  return { nodes, edges }
}
