import type { WasmCursor, WasmEdgeEntry, WasmGraph } from "@shinogati/graphit";

export function setupNextList(element: HTMLUListElement, cursor: WasmCursor, graph: WasmGraph, onNavigate: () => void) {
    element.style = "background-color: green; display: flex; flex-direction: column;";
    element.innerHTML = ""
    const edges = cursor.getEdges(graph) ?? []
    edges.forEach((e: WasmEdgeEntry) => {
        const btn: HTMLButtonElement = document.createElement("button")
        btn.id = `fw-${e.targetVid}`
        btn.innerText = graph.getVertex(e.targetVid)?.label!
        btn.addEventListener('click', () => {
            cursor.moveTo(graph, e.targetVid)
            onNavigate()
        })

        const listItem = document.createElement("li")
        listItem.appendChild(btn)
        element.appendChild(listItem)
    })
}