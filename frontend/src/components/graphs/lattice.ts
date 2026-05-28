import type { Graph } from './types'
import { W, H } from './types'

export function lattice(): Graph {
  const nodes: Graph['nodes'] = []
  const edges: Graph['edges'] = []
  const cols = 10, rows = 6
  const xStep = (W - 100) / (cols - 1)
  const yStep = (H - 60) / (rows - 1)
  const grid: (number | null)[][] = []

  for (let r = 0; r < rows; r++) {
    grid[r] = []
    for (let c = 0; c < cols; c++) {
      if (Math.random() > 0.15) {
        const idx = nodes.length
        grid[r][c] = idx
        nodes.push({
          x: 50 + c * xStep + (Math.random() - 0.5) * 10,
          y: 30 + r * yStep + (Math.random() - 0.5) * 10,
          r: 1.5 + Math.random() * 2,
          opacity: 0.3 + Math.random() * 0.6,
        })
      } else {
        grid[r][c] = null
      }
    }
  }

  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++) {
      const a = grid[r][c]
      if (a === null) continue
      if (c < cols - 1 && grid[r][c + 1] !== null) edges.push({ a, b: grid[r][c + 1]!, opacity: 0.3 + Math.random() * 0.2 })
      if (r < rows - 1 && grid[r + 1][c] !== null) edges.push({ a, b: grid[r + 1][c]!, opacity: 0.3 + Math.random() * 0.2 })
      if (r < rows - 1 && c < cols - 1 && grid[r + 1][c + 1] !== null && Math.random() > 0.6)
        edges.push({ a, b: grid[r + 1][c + 1]!, opacity: 0.15 })
    }

  return { nodes, edges }
}
