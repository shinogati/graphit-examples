import NextList from "./NextList";
import { useContext, useEffect, useState } from "react";
import { GraphitContext, type GraphitCtx } from "./graphit_context";

type NextNavigatorProps = {
    onNavigate: (GCTX: GraphitCtx) => void;
};

function NextNavigator({ onNavigate }: NextNavigatorProps) {
    const gctx = useContext(GraphitContext);
    const [currentNode, setCurrentNode] = useState(gctx.cursor.getNode(gctx.graph)!);

    useEffect(() => {
        setCurrentNode(gctx.cursor.getNode(gctx.graph)!)
        console.log('cursor changed', currentNode.label)
    }, [gctx.cursor, gctx.graph])
    return (
        <>
            <div>
                <div style={{ flex: 1, marginBottom: "3px", paddingBottom: "5px", borderBottom: 1 }}>
                    <NextList onNavigate={onNavigate} />
                </div>
                <svg className="button-icon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" role="presentation" aria-hidden="true">
                    <polyline points="18 15 12 9 6 15" />
                </svg>
                <div>
                    {currentNode.label}
                </div>
            </div>
        </>
    )
}

export default NextNavigator;