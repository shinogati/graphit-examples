import type { WasmCursor } from "@shinogati/graphit";

export function setupBack(element: HTMLButtonElement, cursor: WasmCursor, onNavigate: () => void) {
  element.innerHTML = `← Back`
  element.addEventListener('click', () => {
    cursor.back()
    onNavigate()
  })
}