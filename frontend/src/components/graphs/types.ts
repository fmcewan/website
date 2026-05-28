export type Node = { x: number; y: number; r: number; opacity: number }
export type Edge = { a: number; b: number; opacity: number }
export type Graph = { nodes: Node[]; edges: Edge[] }

export const W = 580
export const H = 320
