import { useEffect, useRef, useCallback } from 'react'

type Node = { x: number; y: number; r: number; opacity: number }
type Edge = { a: number; b: number; opacity: number }
type Graph = { nodes: Node[]; edges: Edge[] }

const W = 580
const H = 320

function constellation(): Graph {
  const nodes: Node[] = Array.from({ length: 28 }, () => ({
    x: 60 + Math.random() * (W - 120),
    y: 30 + Math.random() * (H - 60),
    r: 1.5 + Math.random() * 2.5,
    opacity: 0.3 + Math.random() * 0.7,
  }))
  const edges: Edge[] = []
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x
      const dy = nodes[i].y - nodes[j].y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 120) edges.push({ a: i, b: j, opacity: (1 - dist / 120) * 0.5 })
    }
  }
  return { nodes, edges }
}

function neuralNetwork(): Graph {
  const layers = [3, 5, 5, 4, 2]
  const nodes: Node[] = []
  const edges: Edge[] = []
  const xStep = W / (layers.length + 1)
  layers.forEach((count, li) => {
    const x = xStep * (li + 1)
    const yStep = H / (count + 1)
    for (let ni = 0; ni < count; ni++) {
      nodes.push({
        x: x + (Math.random() - 0.5) * 20,
        y: yStep * (ni + 1) + (Math.random() - 0.5) * 10,
        r: 3 + Math.random() * 2,
        opacity: 0.6 + Math.random() * 0.4,
      })
    }
  })
  for (let li = 0; li < layers.length - 1; li++) {
    const layerStart = layers.slice(0, li).reduce((a, b) => a + b, 0)
    const nextStart = layerStart + layers[li]
    for (let a = layerStart; a < nextStart; a++) {
      for (let b = nextStart; b < nextStart + layers[li + 1]; b++) {
        if (Math.random() > 0.2) edges.push({ a, b, opacity: 0.15 + Math.random() * 0.25 })
      }
    }
  }
  return { nodes, edges }
}

function molecule(): Graph {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const cx = W / 2
  const cy = H / 2
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

function tree(): Graph {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const cx = W / 2
  function branch(x: number, y: number, angle: number, depth: number, parentIdx: number) {
    if (depth === 0) return
    const len = 55 * (depth / 5) + Math.random() * 20
    const nx = x + Math.cos(angle) * len
    const ny = y + Math.sin(angle) * len
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
  nodes.push({ x: cx, y: H - 20, r: 5, opacity: 0.9 })
  branch(cx, H - 20, -Math.PI / 2, 5, 0)
  return { nodes, edges }
}

function vortex(): Graph {
  const nodes: Node[] = []
  const edges: Edge[] = []
  const cx = W / 2
  const cy = H / 2
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

const generators = [constellation, neuralNetwork, molecule, tree, vortex]

const HeroGraph = () => {
  const svgRef = useRef<SVGSVGElement>(null)
  const currentIndex = useRef(Math.floor(Math.random() * generators.length))
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearTimeouts = () => {
    timeouts.current.forEach(clearTimeout)
    timeouts.current = []
  }

  const buildGraph = useCallback((svg: SVGSVGElement, graph: Graph) => {
    const elements: SVGElement[] = []

    graph.edges.forEach(({ a, b, opacity }) => {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', String(graph.nodes[a].x))
      line.setAttribute('y1', String(graph.nodes[a].y))
      line.setAttribute('x2', String(graph.nodes[b].x))
      line.setAttribute('y2', String(graph.nodes[b].y))
      line.setAttribute('stroke', '#78a9ff')
      line.setAttribute('stroke-width', '0.5')
      line.style.opacity = '0'
      line.style.transition = 'opacity 0.4s ease'
      svg.appendChild(line)
      elements.push(line)
      const t = setTimeout(() => { line.style.opacity = String(opacity) }, 50)
      timeouts.current.push(t)
    })

    graph.nodes.forEach(({ x, y, r, opacity }, i) => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', String(x))
      circle.setAttribute('cy', String(y))
      circle.setAttribute('r', String(r))
      circle.setAttribute('fill', '#78a9ff')
      circle.style.opacity = '0'
      circle.style.transition = `opacity 0.3s ease`
      svg.appendChild(circle)
      elements.push(circle)
      const delay = (i / graph.nodes.length) * 800
      const t = setTimeout(() => { circle.style.opacity = String(opacity) }, delay)
      timeouts.current.push(t)
    })

    return elements
  }, [])

  const renderNext = useCallback(() => {
    const svg = svgRef.current
    if (!svg) return

    const children = Array.from(svg.children) as SVGElement[]
    children.forEach(el => {
      el.style.transition = 'opacity 0.5s ease'
      el.style.opacity = '0'
    })

    const t1 = setTimeout(() => {
      while (svg.firstChild) svg.removeChild(svg.firstChild)
      currentIndex.current = (currentIndex.current + 1) % generators.length
      const graph = generators[currentIndex.current]()
      buildGraph(svg, graph)
    }, 550)

    timeouts.current.push(t1)
  }, [buildGraph])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const graph = generators[currentIndex.current]()
    buildGraph(svg, graph)
    const interval = setInterval(renderNext, 8000)
    return () => {
      clearInterval(interval)
      clearTimeouts()
    }
  }, [buildGraph, renderNext])

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      style={{ display: 'block' }}
      aria-hidden="true"
    />
  )
}

export default HeroGraph
