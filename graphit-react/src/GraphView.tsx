import { useContext, useMemo } from "react";
import graphitSvgRaw from "./assets/graph.svg?raw";
import { GraphitContext } from "./graphit_context";

function GraphView() {
    const gctx = useContext(GraphitContext);
    const svgMarkup = useMemo(() => {
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(graphitSvgRaw, "image/svg+xml");
        const svg = svgDoc.querySelector("svg")!;
        svg.style.height = "auto";
        svg.style.width = "50vw";

        const current = gctx.graph.getVertex(gctx.cursor.currentVid)!;
        const matchElement = svg.querySelector<SVGElement>(`#${current.label}`);
        if (matchElement) {
            matchElement.style.fill = "red";
        }

        gctx.visited_edges.forEach((eLbl) => {
            const matchEdge = svg.querySelector<SVGPathElement>(`#${eLbl}`);
            if (matchEdge) {
                matchEdge.style.fill = "blue";
            }
        });

        return svg.outerHTML;
    }, [gctx.cursor.currentVid, gctx.graph, gctx.visited_edges]);

    return (
        <GraphitContext.Consumer>
            {GCTX => (
                <>
                {GCTX.visited_edges.map((vstr) => (<>{vstr}, </>))}
                    <div
                        style={{ backgroundColor: "transparent" }}
                        dangerouslySetInnerHTML={{ __html: svgMarkup }}
                    />
                </>
            )}
        </GraphitContext.Consumer>
    );
}

export default GraphView;