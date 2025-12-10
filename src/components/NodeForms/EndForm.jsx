import React, { useState } from "react";

export default function EndForm({ node, updateNode }) {
  const [message, setMessage] = useState(node.data.message || "");
  const [summary, setSummary] = useState(Boolean(node.data.summary));

  function save() {
    updateNode({ message, summary });
  }

  return (
    <div>
      <div className="form-row"><label>End message</label><input value={message} onChange={e=>setMessage(e.target.value)} /></div>
      <div className="form-row"><label><input type="checkbox" checked={summary} onChange={e=>setSummary(e.target.checked)} /> Include summary</label></div>
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
