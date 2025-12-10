import React, { useState } from "react";

export default function TaskForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || "");
  const [desc, setDesc] = useState(node.data.description || "");
  const [assignee, setAssignee] = useState(node.data.assignee || "");
  const [dueDate, setDueDate] = useState(node.data.dueDate || "");

  function save() {
    updateNode({ title, description: desc, assignee, dueDate });
  }

  return (
    <div>
      <div className="form-row"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
      <div className="form-row"><label>Description</label><textarea rows={3} value={desc} onChange={e=>setDesc(e.target.value)} /></div>
      <div className="form-row"><label>Assignee</label><input value={assignee} onChange={e=>setAssignee(e.target.value)} /></div>
      <div className="form-row"><label>Due date (text)</label><input value={dueDate} onChange={e=>setDueDate(e.target.value)} /></div>
      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
