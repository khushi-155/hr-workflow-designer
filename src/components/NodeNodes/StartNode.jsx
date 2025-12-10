import React from "react";
import { Handle, Position } from "reactflow";

export default function StartNode({ data }) {
  return (
    <div style={{
      padding:10,
      borderRadius:8,
      border:"2px solid #10b981",
      background:"#ecfdf5",
      minWidth:140
    }}>
      <strong>{data.title || "Start"}</strong>

      {/* OUTPUT only */}
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ background: "#10b981" }}
      />
    </div>
  );
}
