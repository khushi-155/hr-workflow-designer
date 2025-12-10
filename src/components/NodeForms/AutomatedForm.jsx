import React, { useEffect, useState } from "react";

export default function AutomatedForm({ node, updateNode }) {
  const [title, setTitle] = useState(node.data.title || "");
  const [actions, setActions] = useState([]);
  const [actionId, setActionId] = useState(node.data.actionId || "");
  const [params, setParams] = useState(node.data.params || {});

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/automations");
        const j = await res.json();
        setActions(j);
      } catch (err) {
        setActions([]);
      }
    }
    load();
  }, []);

  useEffect(() => {
    // when actionId changes, reset params based on action
    (async () => {
      const action = actions.find(a => a.id === actionId);
      if (action) {
        const newParams = {};
        action.params.forEach(p => newParams[p] = params[p] || "");
        setParams(newParams);
      }
    })();
    // eslint-disable-next-line
  }, [actionId]);

  function save() {
    updateNode({ title, actionId, params });
  }

  function updateParam(key, val) {
    setParams((p)=>({ ...p, [key]: val }));
  }

  return (
    <div>
      <div className="form-row"><label>Title</label><input value={title} onChange={e=>setTitle(e.target.value)} /></div>
      <div className="form-row"><label>Action</label>
        <select value={actionId} onChange={e=>setActionId(e.target.value)}>
          <option value="">-- choose action --</option>
          {actions.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
        </select>
      </div>

      {actionId && (() => {
        const action = actions.find(a => a.id === actionId);
        if (!action) return null;
        return (
          <div>
            <div className="small-muted">Action Params</div>
            {action.params.map(param => (
              <div className="form-row" key={param}>
                <label>{param}</label>
                <input value={params[param] || ""} onChange={e=>updateParam(param, e.target.value)} />
              </div>
            ))}
          </div>
        );
      })()}

      <button className="btn" onClick={save}>Save</button>
    </div>
  );
}
