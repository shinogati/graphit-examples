import type { WasmCursor, WasmGraph } from "@shinogati/graphit";

export function setupPayload(element: HTMLDivElement, cursor: WasmCursor, graph: WasmGraph) {
  const pre = document.createElement('code')
  pre.style = "background-color: lightgrey; border-radius: 0.5rem; padding: 0.5rem"
  const node = cursor.getNode(graph)?.payload!
  pre.innerText = node || "No Payload"
  element.replaceChildren(pre)
}