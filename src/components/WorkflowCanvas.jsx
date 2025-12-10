import React, { useCallback, useState, useRef, useMemo } from "react";
import ReactFlow, {
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  Background,
  Controls,
  MiniMap,
} from "reactflow";
import "reactflow/dist/style.css";
import { v4 as uuid } from "uuid";
import StartNode from "./NodeNodes/StartNode";
import TaskNode from "./NodeNodes/TaskNode";
import ApprovalNode from "./NodeNodes/ApprovalNode";
import AutomatedNode from "./NodeNodes/AutomatedNode";
import EndNode from "./NodeNodes/EndNode";
import StartForm from "./NodeForms/StartForm";
import TaskForm from "./NodeForms/TaskForm";
import ApprovalForm from "./NodeForms/ApprovalForm";
import AutomatedForm from "./NodeForms/AutomatedForm";
import EndForm from "./NodeForms/EndForm";
import { nodeDefaults } from "../utils/nodeDefaults";

const nodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

export default function WorkflowCanvas() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [selectedNode, setSelectedNode] = useState(null);
  const reactFlowWrapper = useRef(null);

  const onNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
  const onEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;

    const bounds = reactFlowWrapper.current.getBoundingClientRect();
    const position = {
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    };

    const id = uuid();
    const baseData = nodeDefaults[type] ? { ...nodeDefaults[type] } : {};
    setNodes((nds) =>
      nds.concat({
        id,
        type,
        position,
        data: { ...baseData, id },
      })
    );
  }, []);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onSelectionChange = useCallback(({ nodes: selNodes }) => {
    if (selNodes && selNodes.length) {
      setSelectedNode(selNodes[0]);
    } else {
      setSelectedNode(null);
    }
  }, []);

  // update node data from form
  const updateNodeData = useCallback((id, newData) => {
    setNodes((nds) => nds.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...newData } } : n)));
  }, []);

  // simulate workflow by POSTing to /simulate
  const [execLog, setExecLog] = useState([]);
  const simulateWorkflow = useCallback(async () => {
    const payload = { nodes, edges };
    try {
      setExecLog((l) => [...l, "→ Sending workflow to /simulate..."]);
      const res = await fetch("/simulate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setExecLog((l) => [...l, ...json.log]);
    } catch (err) {
      setExecLog((l) => [...l, `ERROR: ${err.message}`]);
    }
  }, [nodes, edges]);

  // pick form component
  function renderForm(node) {
    if (!node) return <div>Select a node to edit</div>;
    const map = {
      start: StartForm,
      task: TaskForm,
      approval: ApprovalForm,
      automated: AutomatedForm,
      end: EndForm,
    };
    const Form = map[node.type] || (() => <div>No form</div>);
    return (
      <Form
        node={node}
        updateNode={(newData) => updateNodeData(node.id, newData)}
      />
    );
  }

  return (
    <>
      <div ref={reactFlowWrapper} style={{ display: "flex", flex: 1, minWidth: 0, alignItems: "stretch" }} className="canvas-wrap">
        <div style={{flex:1, height:"100%"}}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onSelectionChange={onSelectionChange}
            nodeTypes={nodeTypes}
            fitView
            style={{ width: "100%", height: "100%" }}
          >
            <Background />
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>

        <aside className="right-panel">
          <h3>Node Editor</h3>
          {renderForm(selectedNode)}
          <hr style={{margin:"12px 0"}} />
          <h4>Workflow Test</h4>
          <div style={{display:"flex", gap:8, marginBottom:8}}>
            <button className="btn" onClick={simulateWorkflow}>Test Workflow</button>
          </div>
          <div className="execution-log">
            {execLog.length ? execLog.map((l, i) => <div key={i}>{l}</div>) : <div className="small-muted">No execution yet.</div>}
          </div>
        </aside>
      </div>
    </>
  );
}
