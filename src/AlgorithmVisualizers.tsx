import {
  mapEdges,
  mapNodes,
  treeEdges,
  treeNodes,
  type MapFrame,
  type TreeFrame,
} from "./animation";

// Tree traversals reuse one tree drawing; only the current/visited nodes change.
export function TreeVisualizer({ frame }: { frame: TreeFrame }) {
  return (
    <div className="structure-visualization">
      <svg className="structure-svg" viewBox="0 0 600 280" role="img" aria-label="Binary tree traversal">
        {treeEdges.map(([from, to]) => {
          const start = treeNodes.find((node) => node.id === from)!;
          const end = treeNodes.find((node) => node.id === to)!;
          const active = frame.activeNodeId === from || frame.activeNodeId === to;
          return (
            <line
              key={`${from}-${to}`}
              className={`tree-edge ${active ? "is-active" : ""}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
            />
          );
        })}
        {treeNodes.map((node) => {
          const isCurrent = frame.activeNodeId === node.id;
          const isVisited = frame.visitedNodeIds.includes(node.id);
          return (
            <g key={node.id} className={`visual-node ${isVisited ? "is-visited" : ""} ${isCurrent ? "is-current" : ""}`}>
              <circle cx={node.x} cy={node.y} r="23" />
              <text x={node.x} y={node.y + 5} textAnchor="middle">{node.value}</text>
            </g>
          );
        })}
      </svg>
      <p className="visualization-status">
        Visit order: {frame.visitOrder.length ? frame.visitOrder.join(" → ") : "Ready"}
      </p>
    </div>
  );
}

const sameEdge = (first: [string, string] | null, second: [string, string]) =>
  Boolean(first && ((first[0] === second[0] && first[1] === second[1]) ||
    (first[0] === second[1] && first[1] === second[0])));

// Map searches and pathfinding reuse one weighted graph drawing.
export function MapVisualizer({ frame }: { frame: MapFrame }) {
  return (
    <div className="structure-visualization">
      <svg className="structure-svg" viewBox="0 0 620 255" role="img" aria-label="Graph search visualization">
        {mapEdges.map((edge) => {
          const from = mapNodes.find((node) => node.id === edge.from)!;
          const to = mapNodes.find((node) => node.id === edge.to)!;
          const isPathEdge = frame.pathNodeIds.some((node, index) =>
            index < frame.pathNodeIds.length - 1 && sameEdge(
              [node, frame.pathNodeIds[index + 1]], [edge.from, edge.to],
            ));
          const isActive = sameEdge(frame.activeEdge, [edge.from, edge.to]);
          const labelX = (from.x + to.x) / 2;
          const labelY = (from.y + to.y) / 2 - 7;
          return (
            <g key={`${edge.from}-${edge.to}`}>
              <line
                className={`graph-edge ${isActive ? "is-active" : ""} ${isPathEdge ? "is-path" : ""}`}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
              />
              <text className="edge-weight" x={labelX} y={labelY} textAnchor="middle">{edge.weight}</text>
            </g>
          );
        })}
        {mapNodes.map((node) => {
          const isCurrent = frame.currentNodeId === node.id;
          const isVisited = frame.visitedNodeIds.includes(node.id);
          const isOnPath = frame.pathNodeIds.includes(node.id);
          const distance = frame.distances[node.id];
          return (
            <g key={node.id} className={`visual-node ${isVisited ? "is-visited" : ""} ${isCurrent ? "is-current" : ""} ${isOnPath ? "is-path" : ""}`}>
              <circle cx={node.x} cy={node.y} r="21" />
              <text className="node-label" x={node.x} y={node.y + 4} textAnchor="middle">{node.id}</text>
              <text className="distance-label" x={node.x} y={node.y + 36} textAnchor="middle">
                {distance === undefined || distance === Infinity ? "∞" : distance}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="visualization-status">
        {frame.pathNodeIds.length ? `Path: ${frame.pathNodeIds.join(" → ")}` :
          `Visited: ${frame.visitedNodeIds.join(", ") || "Ready"}`}
      </p>
    </div>
  );
}
