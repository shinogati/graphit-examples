import { createGraph } from '../../../graphit/crates/wasm/pkg';

import './App.css'

function App() {
  
  // const graphit = graphit.getHandler();
  
  // graphmodel = graphit.getRoot();
  // graphmodel.payload = {};
  
  // graphmodel.addNextChild(vid, );
  // graphit.init(rootVertex, optionalConfigs);

  const g = createGraph("Start");
  const root = g.rootVid || 0;

  const new_pricing_strategy_id = g.addChild(root, "New Price Strategy", false) || 0;
  const pricing_distribution_id = g.addChild(new_pricing_strategy_id, "Pricing Distribution", false) || 0;

  g.addChild(pricing_distribution_id, "Return Revenue", false);
  g.addChild(pricing_distribution_id, "Set Min & Max", false);



  function renderGraph() {
    console.log(g);
  }

  return (
    <>
      <section id="center">
        <div>
          
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => renderGraph()}
        >
          Render Graph
        </button>
      </section>
    </>
  )
}

export default App
