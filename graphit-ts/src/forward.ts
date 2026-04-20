import type { WasmCursor, WasmGraph } from "@shinogati/graphit";

export function setupForward(element: HTMLButtonElement, cursor: WasmCursor, graph: WasmGraph, target: number) {
    const prevVid = cursor.moveTo(graph, target);
    if (prevVid !== undefined) {
      // disable button here ?
    }
  element.innerHTML = `← Back`
  element.addEventListener('click', () => cursor.back())
}