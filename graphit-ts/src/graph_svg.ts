import type { WasmCursor, WasmGraph } from "@shinogati/graphit";
import graphitSvgRaw from "./assets/graph.svg?raw";

export function setupGraphSVG(element: HTMLDivElement, cursor: WasmCursor, graph: WasmGraph, v_edges: string[]) {
    element.style = "background-color: transparent;";

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(graphitSvgRaw, "image/svg+xml");
    const svg = svgDoc.querySelector("svg")!;
    svg.style.height = "auto";
    svg.style.width = "30vw";
    const current = graph.getVertex(cursor.currentVid)!
    const lbl =  `#${current.label}`
    const match_element = svg.querySelector<SVGElement>(lbl)
    if(match_element) {
        match_element!.style.fill = "red"
    }

    v_edges.map((e_lbl) => {
        const match_edge = svg.querySelector<SVGPathElement>(`#${e_lbl}`)
        if(match_edge) {
            match_edge.style.fill = 'blue'
        }
    })

    element.replaceChildren(svg);    
}