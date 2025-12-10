import React, { useState } from "react";

export default function ApprovalForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || "");
  const [role, setRole] = useState(node.data.role || "Manager");
  const [threshold, setThreshold] = useState(node.data.autoApproveThreshold || 0);

  function save() {
    updateNode({ title, role, autoApproveThreshold: Number(threshold) });
  }
  return (
    <div>
      <div className="form-row"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
      <div className="form-row"><label>Approver Role</label>
        <select value={role} onChange={e=>setRole(e.target.value)}>
          <option>Manager</option>
          <option>HRBP</option>
          <option>Director</option>
        </select>
      </div>
      <div className="form-row"><label>Auto-approve threshold</label><input type="number" value={threshold} onChange={e=>setThreshold(e.target.value)} /></div>
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
