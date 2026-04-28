import type { WasmEdgeEntry } from "@shinogati/graphit";
import type { VertexData } from "./model";
import { GraphitContext, type GraphitCtx } from "./graphit_context";
import { useContext, useEffect } from "react";

type NextListProps = {
    onNavigate: (GCTX: GraphitCtx) => void;
};

function NextList({ onNavigate }: NextListProps) {
    const gctx = useContext(GraphitContext);
    const currentPayload = gctx.cursor.getNode(gctx.graph)?.payload;
    let vdata = currentPayload ? (JSON.parse(currentPayload) as VertexData) : null;

    const handleClick = (e: WasmEdgeEntry) => {
        console.log("Handle Click", vdata);
        if (vdata && vdata.edgeData) {
            const lbl = vdata?.edgeData.find((d) => d.Target === e.targetVid)?.LBL ?? "";
            console.log('moving to', lbl, e.targetVid)
            if (lbl.length > 1) gctx.visited_edges.push(lbl);
        }
        const newVid = gctx.cursor.moveTo(gctx.graph, e.targetVid);
        console.log("new vid:", newVid)
        onNavigate(gctx);
    };

    useEffect(()=>{},[vdata]);

    return (
        <GraphitContext.Consumer>
            {GCTX => (
                <ul style={{ display: "flex", flexDirection: "row", width: "auto", justifyContent: "center", alignItems: "center" }}>
                    {GCTX.cursor.getEdges(GCTX.graph)?.map((e: WasmEdgeEntry) => (
                        <li key={e.targetVid}>
                            <button
                                id={`fw-${e.targetVid}`}
                                className="navstyle"
                                style={{ margin: 0 }}
                                onClick={() => handleClick(e)}
                            >
                                {GCTX.graph.getVertex(e.targetVid)?.label}
                            </button>
                        </li>
                    ))}
                    <li>({GCTX.visited_edges})</li>
                </ul>
            )

            }
        </GraphitContext.Consumer>
    );
}

export default NextList;