import React from "react";
import Sidebar from "./components/Sidebar";
import WorkflowCanvas from "./components/WorkflowCanvas";
import { ReactFlowProvider } from "reactflow";

export default function App() {
  return (
    <ReactFlowProvider>
      <div className="app">
        <Sidebar />
        <WorkflowCanvas />
      </div>
    </ReactFlowProvider>
  );
}
