import { useEffect, useRef } from 'react'
import { W, H } from './graphs/types'
import type { Graph, Node } from './graphs/types'
import {
  constellation, neuralNetwork, molecule, tree, vortex,
  lattice, cluster, ring, flow, web
} from './graphs/index.ts'

const ACCENT_RGB = [120, 169, 255]
const generators = [constellation, neuralNetwork, molecule, tree, vortex, lattice, cluster, ring, flow, web]

function lerp(a: number, b: number, t: number) { return a + (b - a) * t }
function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }

type RenderNode = Node & { baseX: number; baseY: number }

const HeroGraph = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    canvas.width = W * dpr
    canvas.height = H * dpr
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let currentIdx = Math.floor(Math.random() * generators.length)
    let renderNodes: RenderNode[] = generators[currentIdx]().nodes.map(n => ({ ...n, baseX: n.x, baseY: n.y }))
    let renderEdges: Graph['edges'] = generators[currentIdx]().edges
    let targetGraph: Graph | null = null
    let morphFrom: RenderNode[] | null = null
    let morphT = 1
    let lastMorph = performance.now()
    let rafId: number

    function startMorph() {
      currentIdx = (currentIdx + 1) % generators.length
      targetGraph = generators[currentIdx]()
      morphFrom = renderNodes.map(n => ({ ...n, baseX: n.x, baseY: n.y }))

      while (morphFrom.length < targetGraph.nodes.length) {
        const src = morphFrom[Math.floor(Math.random() * morphFrom.length)]
        morphFrom.push({ ...src })
      }
      while (targetGraph.nodes.length < morphFrom.length) {
        const tgt = targetGraph.nodes[Math.floor(Math.random() * targetGraph.nodes.length)]
        targetGraph.nodes.push({ ...tgt })
      }

      morphT = 0
      renderEdges = targetGraph.edges
    }

    function applyDrift(nodes: RenderNode[], ts: number) {
      return nodes.map((n, i) => ({
        ...n,
        x: n.x + (n.x - W / 2) * 0.02 * Math.sin(i * 0.7 + ts * 0.0015),
        y: n.y + (n.y - H / 2) * 0.02 * Math.cos(i * 0.5 + ts * 0.0013),
        r: n.r * (1 + 0.04 * Math.sin(i * 1.3 + ts * 0.002)),
      }))
    }

    function draw(ts: number) {
      rafId = requestAnimationFrame(draw)

      if (ts - lastMorph > 5000 && morphT >= 1) {
        startMorph()
        lastMorph = ts
      }

      if (morphT < 1 && targetGraph && morphFrom) {
        morphT = Math.min(1, morphT + 0.012)
        const e = easeInOut(morphT)
        renderNodes = morphFrom.map((src, i) => {
          const tgt = targetGraph!.nodes[i]
          return {
            x: lerp(src.baseX, tgt.x, e),
            y: lerp(src.baseY, tgt.y, e),
            r: lerp(src.r, tgt.r, e),
            opacity: lerp(src.opacity, tgt.opacity, e),
            baseX: lerp(src.baseX, tgt.x, e),
            baseY: lerp(src.baseY, tgt.y, e),
          }
        })
      }

      const drifted = applyDrift(renderNodes, ts)

      ctx.clearRect(0, 0, W, H)

      renderEdges.forEach(({ a, b, opacity }) => {
        if (!drifted[a] || !drifted[b]) return
        ctx.beginPath()
        ctx.moveTo(drifted[a].x, drifted[a].y)
        ctx.lineTo(drifted[b].x, drifted[b].y)
        ctx.strokeStyle = `rgba(${ACCENT_RGB.join(',')},${opacity})`
        ctx.lineWidth = 0.5
        ctx.stroke()
      })

      drifted.forEach(({ x, y, r, opacity }) => {
        ctx.beginPath()
        ctx.arc(x, y, Math.max(0.5, r), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ACCENT_RGB.join(',')},${opacity})`
        ctx.fill()
      })
    }

    rafId = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={W}
      height={H}
      style={{ display: 'block', width: '100%', height: 'auto' }}
      aria-hidden="true"
    />
  )
}

export default HeroGraph
