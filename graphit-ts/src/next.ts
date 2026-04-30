import type { WasmCursor, WasmEdgeEntry } from "@shinogati/graphit";
import type { VertexData } from "./model";

export function setupNextList(element: HTMLUListElement, cursor: WasmCursor, onNavigate: () => void, v_edges: string[]) {
    element.style = "display: flex; flex-direction: row; width: auto; justify-content: center; align-items: center;";
    element.innerHTML = ""
    const edges = cursor.getEdges() ?? []
    edges.forEach((e: WasmEdgeEntry) => {
        const btn: HTMLButtonElement = document.createElement("button")
        btn.id = `fw-${e.targetVid}`
        btn.classList.add('navstyle')
        btn.style = "margin: 0"
        btn.innerText = cursor.getGraph().getVertex(e.targetVid)!.label
        const current_payload = cursor.getNode()?.payload
        let lable_data = ""
        if(current_payload) {
            const vdata = JSON.parse(current_payload) as VertexData
            vdata.edgeData.map ((data) => {
                if(data.Target == e.targetVid) {
                    lable_data = data.LBL
                }
            })
        }

        btn.addEventListener('click', () => {
            cursor.moveTo(e.targetVid)
            lable_data.length > 1 && v_edges.push(lable_data)
            onNavigate()
        })
        const listItem = document.createElement("li")
        listItem.appendChild(btn)
        element.appendChild(listItem)
    })
    if(edges.length < 1) {
        const no_edge = document.createElement('div')
        no_edge.innerText = "{}"
        no_edge.classList.add('navstyle')
        element.appendChild(no_edge)
    }
}

export function setupNextNavigator(element: HTMLDivElement, cursor: WasmCursor) {
    element.style = "display: flex; flex-direction: column; padding: 3px; align-items: center;";

    const node = cursor.getNode()!

    const prevDiv = document.createElement('div');
    prevDiv.classList.add('navstyle')
    prevDiv.innerText = `${node.label}`
    prevDiv.style = "border-radius: 30px 30px 0 0; width: 50px; justify-content: center"

    const arrow = document.createElement('div');
    arrow.innerHTML = `<svg class="button-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="presentation" aria-hidden="true"><polyline points="18 15 12 9 6 15"/></svg>`
    while (element.children.length > 1) {
        element.removeChild(element.lastChild!)
    }
    element.appendChild(arrow);
    element.appendChild(prevDiv)
}