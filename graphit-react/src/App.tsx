import { createGraph } from '../../../graphit/crates/wasm/pkg/graphit_wasm';

import './App.css'

function App() {

  const g = createGraph("Start");
  const root = g.rootVid || 0;

  const new_pricing_strategy_id = g.addChild(root, "New Price Strategy", false) || 0;
  const pricing_distribution_id = g.addChild(new_pricing_strategy_id, "Pricing Distribution", false) || 0;

  g.addChild(pricing_distribution_id, "Return Revenue", false);
  g.addChild(pricing_distribution_id, "Set Min & Max", false);

  g.addChild(new_pricing_strategy_id, "Overwrite", false);

  g.addChild(root, "Adjust Live Pricing", false);

  const end_live_experiment_id = g.addChild(root, "End Live Experiment", false) || 0;

  g.addChild(end_live_experiment_id, "Roll out", false);
  g.addChild(end_live_experiment_id, "Roll back", false);



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
      <pre>
        Vertex: {g.getVertex(root)?.label}
        Vertex: {g.getVertex(new_pricing_strategy_id)?.label}
      </pre>
    </>
  )
}

export default App
