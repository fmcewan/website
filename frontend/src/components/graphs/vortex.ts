import type { Graph } from './types'
import { W, H } from './types'

export function vortex(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const cx = W / 2, cy = H / 2
  const count = 32
  for (let i = 0; i < count; i++) {
    const t = i / count
    const angle = t * Math.PI * 6 + Math.random() * 0.3
    const dist = 20 + t * 120 + (Math.random() - 0.5) * 20
    nodes.push({
      x: cx + Math.cos(angle) * dist,
      y: cy + Math.sin(angle) * dist,
      r: 1.5 + (1 - t) * 4,
      opacity: 0.3 + (1 - t) * 0.7,
    })
    if (i > 0) edges.push({ a: i - 1, b: i, opacity: 0.2 + (1 - t) * 0.4 })
    if (i > 4 && Math.random() > 0.5) edges.push({ a: i - 4, b: i, opacity: 0.15 })
  }
  nodes.push({ x: cx, y: cy, r: 6, opacity: 1 })
  edges.push({ a: 0, b: count, opacity: 0.3 })
  return { nodes, edges }
}
