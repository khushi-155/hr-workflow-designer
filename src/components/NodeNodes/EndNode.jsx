import React from "react";
import { Handle, Position } from "reactflow";

export default function EndNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        border: "2px solid #ef4444",
        background: "#fff1f2",
        minWidth: 140,
        position: "relative"
      }}
    >
      <strong>End</strong>
      <div style={{ fontSize: 12, marginTop: 6 }}>
        {data.message || ""}
      </div>

      {/* INPUT ONLY (End node has no output) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#ef4444" }}
      />
    </div>
  );
}
