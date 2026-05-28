import type { Graph } from './types'
import { W, H } from './types'

export function constellation(): Graph {
  const nodes = Array.from({ length: 26 }, () => ({
    x: 60 + Math.random() * (W - 120),
    y: 30 + Math.random() * (H - 60),
    r: 1.5 + Math.random() * 2.5,
    opacity: 0.3 + Math.random() * 0.7,
  }))
  const edges: Graph['edges'] = []
  for (let i = 0; i < nodes.length; i++)
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const d = Math.sqrt(dx * dx + dy * dy)
      if (d < 120) edges.push({ a: i, b: j, opacity: (1 - d / 120) * 0.5 })
    }
  return { nodes, edges }
}
