import type { Graph } from './types'
import { W, H } from './types'

export function ring(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const cx = W / 2, cy = H / 2
  const rings = [
    { count: 6, radius: 40, r: 4, opacity: 0.9 },
    { count: 10, radius: 90, r: 3, opacity: 0.7 },
    { count: 16, radius: 140, r: 2, opacity: 0.5 },
  ]

  const ringStart: number[] = []

  rings.forEach(({ count, radius, r, opacity }) => {
    ringStart.push(nodes.length)
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.1
      nodes.push({
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        r: r + Math.random() * 1.5,
        opacity: opacity + (Math.random() - 0.5) * 0.2,
      })
    }
  })

  rings.forEach(({ count }, ri) => {
    const start = ringStart[ri]
    for (let i = 0; i < count; i++) {
      edges.push({ a: start + i, b: start + (i + 1) % count, opacity: 0.35 })
      if (ri < rings.length - 1 && Math.random() > 0.5) {
        const nextStart = ringStart[ri + 1]
        const nextCount = rings[ri + 1].count
        const nearest = Math.round((i / count) * nextCount) % nextCount
        edges.push({ a: start + i, b: nextStart + nearest, opacity: 0.2 })
      }
    }
  })

  nodes.push({ x: cx, y: cy, r: 6, opacity: 1 })
  ringStart.forEach((start) => {
    edges.push({ a: nodes.length - 1, b: start, opacity: 0.25 })
  })

  return { nodes, edges }
}
