import React from "react";
import { Handle, Position } from "reactflow";

export default function ApprovalNode({ data }) {
  return (
    <div
      style={{
        padding: 10,
        borderRadius: 8,
        border: "1px solid #f59e0b",
        background: "#fffbeb",
        minWidth: 150,
        position: "relative"
      }}
    >
      <strong>{data.title || "Approval"}</strong>
      <div style={{ fontSize: 12, marginTop: 6 }}>
        Role: {data.role || "Manager"}
      </div>

      {/* LEFT handle = input */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: "#f59e0b" }}
      />

      {/* RIGHT handle = output */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: "#f59e0b" }}
      />
    </div>
  );
}
