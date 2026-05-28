import type { Graph } from './types'
import { W, H } from './types'

export function web(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const cx = W / 2, cy = H / 2
  const spokes = 7 + Math.floor(Math.random() * 3)
  const rings = 4

  nodes.push({ x: cx, y: cy, r: 5, opacity: 1 })

  for (let s = 0; s < spokes; s++) {
    const angle = (s / spokes) * Math.PI * 2 + Math.random() * 0.15
    for (let r = 1; r <= rings; r++) {
      const dist = (r / rings) * 140 + (Math.random() - 0.5) * 15
      nodes.push({
        x: cx + Math.cos(angle) * dist,
        y: cy + Math.sin(angle) * dist,
        r: 1.5 + (rings - r) * 0.5 + Math.random(),
        opacity: 0.3 + (rings - r) * 0.15 + Math.random() * 0.2,
      })
    }
  }

  for (let s = 0; s < spokes; s++) {
    edges.push({ a: 0, b: 1 + s * rings, opacity: 0.35 })
    for (let r = 0; r < rings - 1; r++) {
      edges.push({ a: 1 + s * rings + r, b: 1 + s * rings + r + 1, opacity: 0.3 })
    }
  }

  for (let r = 0; r < rings; r++) {
    for (let s = 0; s < spokes; s++) {
      const a = 1 + s * rings + r
      const b = 1 + ((s + 1) % spokes) * rings + r
      edges.push({ a, b, opacity: 0.2 + (rings - r) * 0.05 })
    }
  }

  return { nodes, edges }
}
