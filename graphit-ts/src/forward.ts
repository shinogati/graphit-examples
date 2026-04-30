import type { WasmCursor } from "@shinogati/graphit";

export function setupForward(element: HTMLButtonElement, cursor: WasmCursor, target: number) {
    const prevVid = cursor.moveTo(target);
    if (prevVid !== undefined) {
      // disable button here ?
    }
  element.innerHTML = `← Back`
  element.addEventListener('click', () => cursor.back())
}