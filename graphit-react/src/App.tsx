import viteLogo from './assets/vite.svg'
import graphitLogo from './assets/graphit.svg'
import heroImg from './assets/hero.png'


import { useState } from 'react';
import './App.css';
import NextNavigator from './NextNavigator';
import GraphView from './GraphView';
import PayloadView from './PayloadView';
import { GraphitContext, type GraphitCtx } from './graphit_context';
import GCTX from './graphit_scheme';


function App() {
  const [graphitState, setGraphitState] = useState(GCTX);
  const onNavigate = (gctx: GraphitCtx) => {
    setGraphitState({ ...gctx });
  }


  return (
    <>
      <GraphitContext value={graphitState}>
            <>
              <section id="center">
                <div className="hero">
                  <img src={heroImg} className="base" width="170" height="179" />
                  <img src={graphitLogo} className="framework" alt="TypeScript logo" />
                  <img src={viteLogo} className="vite" alt="Vite logo" />
                </div>
                <div>
                  <h1>Graph it!</h1>
                  <GraphView />
                </div>
                <p id="current" className="navstyle"></p>
              </section>

              <section id="next-steps">
                <div id="docs">
                  <h2><button id="back"></button></h2>
                  <p id="path"></p>
                  <NextNavigator onNavigate={onNavigate} />
                </div>
                <div id="social">
                  <h2>Payload</h2>
                  <PayloadView />
                </div>
              </section>
              <section id="spacer"></section>
            </>
      </GraphitContext>
    </>
  );
}

export default App;
