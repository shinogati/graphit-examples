import type { WasmCursor } from "@shinogati/graphit";

export function setupPayload(element: HTMLDivElement, cursor: WasmCursor) {
  const pre = document.createElement('code')
  pre.style = "background-color: lightgrey; border-radius: 0.5rem; padding: 0.5rem"
  const node = cursor.getNode()?.payload!
  pre.innerText = node || "No Payload"
  element.replaceChildren(pre)
}