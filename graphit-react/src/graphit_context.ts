import { createContext } from "react";
import { createGraph, WasmCursor, WasmGraph } from "@shinogati/graphit";

const g = createGraph("Root")
const c = g.cursor()!

export interface GraphitCtx {
    graph: WasmGraph,
    cursor: WasmCursor,
    visited_edges: string[]
}

export const GraphitContext = createContext<GraphitCtx>({ graph: g, cursor: c, visited_edges: [] });