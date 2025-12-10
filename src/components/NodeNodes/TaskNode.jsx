import React from "react";
import { Handle, Position } from "reactflow";

export default function TaskNode({ data }) {
  return (
    <div style={{
      padding:10,
      borderRadius:8,
      border:"1px solid #3b82f6",
      background:"#eff6ff",
      minWidth:160
    }}>
      <strong>{data.title || "Task"}</strong>
      <div style={{fontSize:12, marginTop:6}}>
        {data.assignee || "Unassigned"}
      </div>

      {/* INPUT */}
      <Handle type="target" position={Position.Left} style={{ background:"#3b82f6" }} />
      {/* OUTPUT */}
      <Handle type="source" position={Position.Right} style={{ background:"#3b82f6" }} />
    </div>
  );
}
