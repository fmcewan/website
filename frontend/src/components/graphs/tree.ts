import type { Graph } from './types'
import { W, H } from './types'

export function tree(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const cx = W / 2
  const rootY = H - 40

  function branch(x: number, y: number, angle: number, depth: number, parentIdx: number) {
    if (depth === 0) return
    const len = 45 * (depth / 5) + Math.random() * 15
    const nx = x + Math.cos(angle) * len
    const ny = y + Math.sin(angle) * len
    if (ny < 10) return
    const idx = nodes.length
    nodes.push({ x: nx, y: ny, r: depth * 1.2, opacity: 0.4 + depth * 0.1 })
    edges.push({ a: parentIdx, b: idx, opacity: 0.2 + depth * 0.08 })
    const spread = 0.5 + Math.random() * 0.4
    const branches = depth > 2 ? 2 + Math.floor(Math.random() * 2) : 2
    for (let i = 0; i < branches; i++) {
      const a = angle + (i - (branches - 1) / 2) * spread + (Math.random() - 0.5) * 0.3
      branch(nx, ny, a, depth - 1, idx)
    }
  }

  nodes.push({ x: cx, y: rootY, r: 5, opacity: 0.9 })
  branch(cx, rootY, -Math.PI / 2, 5, 0)
  return { nodes, edges }
}
