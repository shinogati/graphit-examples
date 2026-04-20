import './style.css'
import typescriptLogo from './assets/typescript.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import { setupCounter } from './counter.ts'

type EdgeData = {
  Target: number,
  Cost: number
}

interface VertexData {
  edgeData: EdgeData[],
  description: string,
  url: string
}

import {
  createGraph,
} from "@shinogati/graphit"
import { setupBack } from './back.ts'
import { setupNextList } from './next.ts'

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
  edgeData: [{ Target: B_VID, Cost: 3 }, { Target: C_VID, Cost: 6 }]
} as VertexData))


const c = g.cursor()!



document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
<section id="center">
  <p id="current"></p>
</section>




<section id="center">
  <div class="hero">
    <img src="${heroImg}" class="base" width="170" height="179">
    <img src="${typescriptLogo}" class="framework" alt="TypeScript logo"/>
    <img src=${viteLogo} class="vite" alt="Vite logo" />
  </div>
  <div>
    <h1>Get started</h1>
    <p>Edit <code>src/main.ts</code> and save to test <code>HMR</code></p>
  </div>
  <button id="counter" type="button" class="counter"></button>
</section>

<div class="ticks"></div>

<section id="next-steps">
  <div id="docs">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#documentation-icon"></use></svg>
    <h2>Path: </h2>
    <p id="path"></p>
    <button id="back"></button>
    <div style="background-color: yellow; flex: 1">
      <ul id="next-list"></ul>
    </div>
    <p>Your questions, answered</p>
    <ul>
      <li>
        <a href="https://vite.dev/" target="_blank">
          <img class="logo" src=${viteLogo} alt="" />
          Explore Vite
        </a>
      </li>
      <li>
        <a href="https://www.typescriptlang.org" target="_blank">
          <img class="button-icon" src="${typescriptLogo}" alt="">
          Learn more
        </a>
      </li>
    </ul>
  </div>
  <div id="social">
    <svg class="icon" role="presentation" aria-hidden="true"><use href="/icons.svg#social-icon"></use></svg>
    <h2>Connect with us</h2>
    <p>Join the Vite community</p>
    <ul>
      <li><a href="https://github.com/vitejs/vite" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#github-icon"></use></svg>GitHub</a></li>
      <li><a href="https://chat.vite.dev/" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#discord-icon"></use></svg>Discord</a></li>
      <li><a href="https://x.com/vite_js" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#x-icon"></use></svg>X.com</a></li>
      <li><a href="https://bsky.app/profile/vite.dev" target="_blank"><svg class="button-icon" role="presentation" aria-hidden="true"><use href="/icons.svg#bluesky-icon"></use></svg>Bluesky</a></li>
    </ul>
  </div>
</section>

<div class="ticks"></div>
<section id="spacer"></section>
`

function pathUI (path: number[]): HTMLDivElement {
  const path_container = document.createElement('div')
  path_container.style = ""
  path.map((vid) => {
    const node = document.createElement('div')
    const arrow = document.createElement('div')
    arrow.style = "color: red; display: inline-block; border-radius: 10%; padding: 1px; margin: 1px"
    arrow.innerText = "→"
    node.style = "background-color: black; color: white; align-content: center;text-align: center; display: inline-block; border-radius: 50%; width: 4vw; height: 4vw; padding: 5px"
    node.innerText = `${(g.getVertex(vid)?.label ?? vid.toString())}`
    if(vid !== g.rootVid) {
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

  document.querySelector<HTMLParagraphElement>('#current')!.innerHTML =
    `Current: <strong>${node.label}</strong> (step ${node.step})`

  document.querySelector<HTMLParagraphElement>('#path')!.replaceChildren(pathUI(path))

  document.querySelector<HTMLButtonElement>('#back')!.disabled = path.length <= 1

  setupNextList(document.querySelector<HTMLUListElement>('#next-list')!, c, g, render)
}

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
setupBack(document.querySelector<HTMLButtonElement>('#back')!, c, render)
render()