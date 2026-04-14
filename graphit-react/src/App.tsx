import {
  createGraph,
  WasmCursor,
  WasmEdgeEntry,
  WasmGraph,
  WasmVertex,
} from '../../../graphit/crates/wasm/pkg/graphit_wasm';
import { useEffect, useState } from 'react';
import './App.css';

type GraphitState = {
  graph: WasmGraph;
  root: number;
  newPricingId: number;
  cursor: WasmCursor;
  node: WasmVertex;
  edges: WasmEdgeEntry[];
  path: number[];
};

function App() {
  const [graphitState, setGraphitState] = useState<GraphitState | null>(null);

  useEffect(() => {
    const g = createGraph("Start");
    const root = g.rootVid!;
    const newPricingId        = g.addChild(root, "New Price Strategy", false)!;
    g.setPayload(newPricingId, JSON.stringify({ description: "Experiment with a new pricing strategy for product X" }));
    const pricingDistId       = g.addChild(newPricingId, "Pricing Distribution", false)!;
    g.addChild(pricingDistId, "Return Revenue", false);
    g.addChild(pricingDistId, "Set Min & Max", false);
    g.addChild(newPricingId,  "Overwrite", false);
    g.addChild(root,          "Adjust Live Pricing", false);
    const endLiveId           = g.addChild(root, "End Live Experiment", false)!;
    g.addChild(endLiveId, "Roll out", false);
    g.addChild(endLiveId, "Roll back", false);

    const c = new WasmCursor(g);

    setGraphitState({
      graph: g,
      root,
      newPricingId,
      cursor: c,
      node: c.getNode(g)!,
      edges: c.getEdges(g) ?? [],
      path: Array.from(c.getPath()),
    });
  }, []);

  function moveTo(targetVid: number) {
    if (!graphitState) return;
    const { cursor, graph } = graphitState;
    const newVid = cursor.moveTo(graph, targetVid);
    if (newVid !== undefined) {
      setGraphitState({
        ...graphitState,
        node: cursor.getNode(graph)!,
        edges: cursor.getEdges(graph) ?? [],
        path: Array.from(cursor.getPath()),
      });
    }
  }

  function back() {
    if (!graphitState) return;
    const { cursor, graph } = graphitState;
    const prevVid = cursor.back();
    if (prevVid !== undefined) {
      setGraphitState({
        ...graphitState,
        node: cursor.getNode(graph)!,
        edges: cursor.getEdges(graph) ?? [],
        path: Array.from(cursor.getPath()),
      });
    }
  }

  if (!graphitState) return <p>Loading...</p>;

  const { graph, root, node, edges, path } = graphitState;

  return (
    <>
      <section id="center">
        <p>Current: <strong>{node.label}</strong> (step {node.step})</p>
        <button className="counter" onClick={() => console.log(graphitState.cursor)}>
          Render Graph
        </button>
      </section>

      <p>
        Path: {path.map((vid) => graph.getVertex(vid)?.label ?? vid).join(' → ')}
      </p>

      <button onClick={back} disabled={path.length <= 1}>
        ← Back
      </button>
      <div>
        <h4>Description</h4>
        <p>{node.payload ? JSON.parse(node.payload).description : "No description available."}</p>
      </div>

      <ul>
        {edges.map((e: WasmEdgeEntry) => (
          <li key={e.targetVid}>
            <button onClick={() => moveTo(e.targetVid)}>
              {graph.getVertex(e.targetVid)?.label ?? e.targetVid}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
