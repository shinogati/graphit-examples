import { createGraph } from "@shinogati/graphit"
import type { VertexData } from "./model"
import type { GraphitCtx } from "./graphit_context"

const g = createGraph("Root")
const root_vertex_id = g.rootVid!
// g.setPayload(root_vertex_id, "{\"name\": 334}")

const A_VID = g.addChild(root_vertex_id, "A", false)!
const B_VID = g.addChild(A_VID, "B", false)!
const C_VID = g.addChild(A_VID, "C", false)!
g.addEdge(B_VID, C_VID, false)
const D_VID = g.addChild(B_VID, "D", false)!
g.addEdge(C_VID, D_VID, false)
const E_VID = g.addChild(D_VID, "E", false)!
const F_VID = g.addChild(D_VID, "F", false)!
const G_VID = g.addChild(D_VID, "G", false)!
const H_VID = g.addChild(E_VID, "H", false)!
g.addEdge(F_VID, H_VID, false)
g.addEdge(G_VID, H_VID, false)
g.addEdge(B_VID, E_VID, false)
g.addEdge(C_VID, G_VID, false)

g.setPayload(A_VID, JSON.stringify({
    edgeData: [
        { Target: B_VID, Cost: 3, LBL: "E_A_B" },
        { Target: C_VID, Cost: 6, LBL: "E_A_C" }]
} as VertexData))

g.setPayload(B_VID, JSON.stringify({
    edgeData: [
        { Target: C_VID, Cost: 4, LBL: "E_B_C" },
        { Target: D_VID, Cost: 4, LBL: "E_B_D" },
        { Target: E_VID, Cost: 11, LBL: "E_B_E" }]
} as VertexData))

g.setPayload(C_VID, JSON.stringify({
    edgeData: [
        { Target: D_VID, Cost: 8, LBL: "E_C_D" },
        { Target: G_VID, Cost: 11, LBL: "E_C_G" }]
} as VertexData))

g.setPayload(D_VID, JSON.stringify({
    edgeData: [
        { Target: E_VID, Cost: -4, LBL: "E_D_E" },
        { Target: F_VID, Cost: 5, LBL: "E_D_F" },
        { Target: G_VID, Cost: 2, LBL: "E_D_G" }]
} as VertexData))

g.setPayload(E_VID, JSON.stringify({
    edgeData: [
        { Target: H_VID, Cost: 9, LBL: "E_E_H" }
    ]
} as VertexData))

g.setPayload(F_VID, JSON.stringify({
    edgeData: [
        { Target: H_VID, Cost: 1, LBL: "E_F_H" }
    ]
} as VertexData))

g.setPayload(G_VID, JSON.stringify({
    edgeData: [
        { Target: H_VID, Cost: 2, LBL: "E_G_H" }
    ]
} as VertexData))

const c = g.cursor()!

const GCTX: GraphitCtx = { graph: g, cursor: c, visited_edges: [] }

export default GCTX;