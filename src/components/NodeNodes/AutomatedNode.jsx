import React from "react";
import { Handle, Position } from "reactflow";

export default function AutomatedNode({ data }) {
  return (
    <div style={{
      padding: 10,
      borderRadius: 8,
      border: "1px solid #7c3aed",
      background: "#f5f3ff",
      minWidth: 160,
      position: "relative"
    }}>
      <strong>{data.title || "Automated"}</strong>
      <div style={{ fontSize: 12, marginTop: 6 }}>
        Action: {data.actionId || "—"}
      </div>

      {/* INPUT handle (left) */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#7c3aed" }}
      />

      {/* OUTPUT handle (right) */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#7c3aed" }}
      />
    </div>
  );
}
