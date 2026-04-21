import type { WasmCursor } from "@shinogati/graphit";

export function setupBack(element: HTMLButtonElement, cursor: WasmCursor, onNavigate: () => void, v_edges: string[]) {
  element.innerHTML = `<svg class="button-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" role="presentation" aria-hidden="true"><polyline points="15 18 9 12 15 6"/></svg>Back`
  element.classList.add('navstyle')
  element.style = " flex-direction: row; align-items: center;text-align: center; height: 50px; margin: 5px 0"
  element.addEventListener('click', () => {
    cursor.back()
    v_edges.pop()
    onNavigate()
  })
}