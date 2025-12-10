import React, { useState } from "react";

export default function StartForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || "");
  const [metaKey, setMetaKey] = useState("");
  const [metaVal, setMetaVal] = useState("");

  function save() {
    const metadata = { ...(node.data.metadata || {}) };
    if (metaKey) metadata[metaKey] = metaVal;
    updateNode({ title, metadata });
  }

  return (
    <div>
      <div className="form-row">
        <label>Start Title</label>
        <input value={title} onChange={(e)=>setTitle(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Add metadata (key / value)</label>
        <input placeholder="key" value={metaKey} onChange={(e)=>setMetaKey(e.target.value)} style={{marginBottom:6}} />
        <input placeholder="value" value={metaVal} onChange={(e)=>setMetaVal(e.target.value)} />
      </div>
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
