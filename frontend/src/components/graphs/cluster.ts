import type { Graph } from './types'
import { W, H } from './types'

export function cluster(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const clusterCount = 3 + Math.floor(Math.random() * 2)
  const centres = Array.from({ length: clusterCount }, () => ({
    x: 80 + Math.random() * (W - 160),
    y: 40 + Math.random() * (H - 80),
  }))

  const clusterNodes: number[][] = centres.map(() => [])

  centres.forEach((c, ci) => {
    const count = 5 + Math.floor(Math.random() * 6)
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2
      const dist = 10 + Math.random() * 45
      const idx = nodes.length
      clusterNodes[ci].push(idx)
      nodes.push({
        x: c.x + Math.cos(angle) * dist,
        y: c.y + Math.sin(angle) * dist,
        r: 2 + Math.random() * 3,
        opacity: 0.5 + Math.random() * 0.5,
      })
    }
    for (let i = 0; i < clusterNodes[ci].length; i++)
      for (let j = i + 1; j < clusterNodes[ci].length; j++)
        if (Math.random() > 0.4)
          edges.push({ a: clusterNodes[ci][i], b: clusterNodes[ci][j], opacity: 0.3 + Math.random() * 0.3 })
  })

  for (let i = 0; i < clusterCount; i++)
    for (let j = i + 1; j < clusterCount; j++) {
      const a = clusterNodes[i][Math.floor(Math.random() * clusterNodes[i].length)]
      const b = clusterNodes[j][Math.floor(Math.random() * clusterNodes[j].length)]
      edges.push({ a, b, opacity: 0.15 + Math.random() * 0.1 })
    }

  return { nodes, edges }
}
