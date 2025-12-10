import React from "react";

const nodeTypes = [
  { type: "start", label: "Start Node" },
  { type: "task", label: "Task Node" },
  { type: "approval", label: "Approval Node" },
  { type: "automated", label: "Automated Step Node" },
  { type: "end", label: "End Node" }
];

export default function Sidebar() {
  function onDragStart(e, nodeType) {
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  }

  return (
    <aside className="sidebar">
      <h3>Nodes</h3>
      <div className="small-muted">Drag onto canvas</div>
      {nodeTypes.map((n) => (
        <div
          key={n.type}
          className="node-item"
          draggable
          onDragStart={(e) => onDragStart(e, n.type)}
        >
          {n.label}
        </div>
      ))}
      <div style={{flex:1}} />
      <div className="small-muted">Prototype — not production</div>
    </aside>
  );
}
