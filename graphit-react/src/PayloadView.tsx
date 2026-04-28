import { GraphitContext } from "./graphit_context";

function PayloadView() {
    return (
        <GraphitContext.Consumer>
            {GCTX => (
                <code style={{ backgroundColor: "lightgrey", borderRadius: "0.5rem", padding: "0.5rem" }}>
                    {GCTX.cursor.getNode(GCTX.graph)?.payload}
                </code>
            )

            }
        </GraphitContext.Consumer>
    );
}

export default PayloadView;