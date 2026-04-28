import './style.css'
import viteLogo from './assets/vite.svg'
import graphitLogo from './assets/graphit.svg'
import heroImg from './assets/hero.png'

import {
  createGraph,
} from "@shinogati/graphit"
import { setupBack } from './back.ts'
import { setupNextList, setupNextNavigator } from './next.ts'
import { setupGraphSVG } from './graph_svg.ts';
import { setupPayload } from './payload.ts';
import type { VertexData } from './model.ts'

const g = createGraph("Root")
const root_vertex_id = g.rootVid!

const A_VID = g.addChild(root_vertex_id, "A", false)!
const B_VID = g.addChild(A_VID, "B", false)!
const C_VID = g.addChild(A_VID, "C", false)!
g.addEdge(B_VID, C_VID, false)
const D_VID = g.addChild(B_VID, "D", false)!
g.addEdge(C_VID, D_VID, false)
const E_VID = g.addChild(D_VID, "E", false)!
const F_VID = g.addChild(D_VID, "F", false)!
const G_VID = g.addChild(D_VID, "G", false)!
const H_VID = g.addChild(E_VID, "H", false)!
g.addEdge(F_VID, H_VID, false)
g.addEdge(G_VID, H_VID, false)
g.addEdge(B_VID, E_VID, false)
g.addEdge(C_VID, G_VID, false)

g.setPayload(A_VID, JSON.stringify({
  edgeData: [
    { Target: B_VID, Cost: 3, LBL: "E_A_B" }, 
    { Target: C_VID, Cost: 6, LBL: "E_A_C" }]
} as VertexData))

g.setPayload(B_VID, JSON.stringify({
  edgeData: [
    { Target: C_VID, Cost: 4, LBL: "E_B_C" }, 
    { Target: D_VID, Cost: 4, LBL: "E_B_D" }, 
    { Target: E_VID, Cost: 11, LBL: "E_B_E" }]
} as VertexData))

g.setPayload(C_VID, JSON.stringify({
  edgeData: [
    { Target: D_VID, Cost: 8, LBL: "E_C_D" }, 
    { Target: G_VID, Cost: 11, LBL: "E_C_G" }]
} as VertexData))

g.setPayload(D_VID, JSON.stringify({
  edgeData: [
    { Target: E_VID, Cost: -4, LBL: "E_D_E" }, 
    { Target: F_VID, Cost: 5, LBL: "E_D_F" }, 
    { Target: G_VID, Cost: 2, LBL: "E_D_G" }]
} as VertexData))

g.setPayload(E_VID, JSON.stringify({
  edgeData: [
    { Target: H_VID, Cost: 9, LBL: "E_E_H" }
  ]
} as VertexData))

g.setPayload(F_VID, JSON.stringify({
  edgeData: [
    { Target: H_VID, Cost: 1, LBL: "E_F_H" }
  ]
} as VertexData))

g.setPayload(G_VID, JSON.stringify({
  edgeData: [
    { Target: H_VID, Cost: 2, LBL: "E_G_H" }
  ]
} as VertexData))


const c = g.cursor()!
const visited_edge: string[] = [];



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${graphitLogo}" class="framework" alt="TypeScript logo"/>
    <img src=${viteLogo} class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Graph it!</h1>
    <div id="graphExample"></div>
  </div>
  <p id="current" class="navstyle"></p>
</section>



<section id="next-steps">
  <div id="docs">
    <h2><button id="back"></button></h2>
    <p id="path"></p>
    <div id="next-navigator">
      <div style="flex: 1; margin-bottom: 3px; padding-bottom: 5px; border-bottom: 1px solid black">
        <ul id="next-list"></ul>
      </div>
    </div>
  </div>
  <div id="social">
    <h2>Payload</h2>
    <div id="payload"></div>
  </div>
</section>
<section id="spacer"></section>
`

function pathUI(path: number[]): HTMLDivElement {
  const path_container = document.createElement('div')
  // path_container.style = "background-color: yellow; padding: 5px"
  path_container.classList.add('button-icon')
  path.map((vid) => {
    const node = document.createElement('div')
    const arrow = document.createElement('div')
    arrow.style = "color: red; display: inline-block; border-radius: 10%; padding: 1px; margin: 1px"
    arrow.innerText = "→"
    node.style = "background-color: black; color: white; align-content: center;text-align: center; display: inline-block; border-radius: 50%; width: 2vw; height: 2vw; padding: 5px"
    node.innerText = `${(g.getVertex(vid)?.label ?? vid.toString())}`
    if (vid !== g.rootVid) {
      path_container.appendChild(arrow)
    }
    path_container.appendChild(node)
  })
  // path_container.innerText = `${path.map((vid) => g.getVertex(vid)?.label ?? vid).join(' → ')}`
  return path_container
}


function render() {
  const node = c.getNode(g)!
  const path = Array.from(c.getPath())

  const currnet = document.querySelector<HTMLParagraphElement>('#current')!
  currnet.innerHTML = `Vertex: (<strong>${node.label}</strong>)`
  const current_step = document.createElement('span')
  current_step.innerText = `(step ${node.step-1})`
  current_step.classList.add('navstyle')
  current_step.style = "margin: 0 0 0 20px"
  currnet.appendChild(current_step)

  document.querySelector<HTMLParagraphElement>('#path')!.replaceChildren(pathUI(path))

  document.querySelector<HTMLButtonElement>('#back')!.disabled = path.length <= 1

  setupNextList(document.querySelector<HTMLUListElement>('#next-list')!, c, g, render, visited_edge)
  setupNextNavigator(document.querySelector<HTMLDivElement>('#next-navigator')!, c, g)
  setupGraphSVG(document.querySelector<HTMLDivElement>('#graphExample')!, c, g, visited_edge)
  setupPayload(document.querySelector<HTMLDivElement>('#payload')!, c, g)
}
setupBack(document.querySelector<HTMLButtonElement>('#back')!, c, render, visited_edge)
render()