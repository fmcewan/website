import type { Graph } from './types'
import { W, H } from './types'

export function molecule(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const cx = W / 2, cy = H / 2
  nodes.push({ x: cx, y: cy, r: 7, opacity: 1 })
  const hubCount = 4 + Math.floor(Math.random() * 3)
  for (let i = 0; i < hubCount; i++) {
    const angle = (i / hubCount) * Math.PI * 2 + Math.random() * 0.4
    const dist = 80 + Math.random() * 40
    const hx = cx + Math.cos(angle) * dist
    const hy = cy + Math.sin(angle) * dist
    nodes.push({ x: hx, y: hy, r: 4 + Math.random() * 2, opacity: 0.8 })
    edges.push({ a: 0, b: i + 1, opacity: 0.5 })
    const leafCount = 1 + Math.floor(Math.random() * 3)
    for (let j = 0; j < leafCount; j++) {
      const la = angle + (Math.random() - 0.5) * 1.2
      const ld = 40 + Math.random() * 30
      nodes.push({
        x: hx + Math.cos(la) * ld,
        y: hy + Math.sin(la) * ld,
        r: 2 + Math.random() * 1.5,
        opacity: 0.5 + Math.random() * 0.3,
      })
      edges.push({ a: i + 1, b: nodes.length - 1, opacity: 0.35 })
    }
  }
  return { nodes, edges }
}
