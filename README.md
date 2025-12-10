HR Workflow Designer

A visual, drag-and-drop workflow builder built using React, React Flow, and Mock Service Worker (MSW).
This prototype allows users to design HR workflows such as onboarding, approvals, automation steps, and task routing.

1. Project Overview

The HR Workflow Designer allows HR teams to visually design workflows by dragging different types of nodes onto a canvas:
Start Node
Task Node
Approval Node
Automated Step Node
End Node

Users can:
Drag nodes from sidebar
Connect nodes with edges
Edit node properties
Delete nodes/edges
Run a simulated workflow execution (using MSW mock API)
This prototype focuses on UI/UX, flow logic, and simulation, not real backend execution.

2. Architecture
Frontend Stack

React 18 – Component-based UI
React Flow – Graph editor (canvas, nodes, edges)
MSW (Mock Service Worker) – API simulation
Vite – Fast dev server
CSS Modules / Inline styling – Styling

3. Project Structure
<img width="902" height="738" alt="image" src="https://github.com/user-attachments/assets/d8bcaffa-c74f-4890-9e10-12d081e17a08" />

4. How to Run Locally
Step 1 — Install dependencies
    npm install
Step 2 — Generate MSW Worker (required)
    npx msw init public/ --save
Step 3 — Start Development Server
    npm run dev
Step 4 — Open Browser
   http://localhost:5173/

   
4. Design Decisions
   Why React Flow?

React Flow provides:
  Drag-and-drop nodes
  Custom node components
  Handles for edge connections
  Zoom & pan
  React-friendly integration

Perfect for building visual workflow tools.
 Why MSW (Mock Service Worker)?
  No backend required
  Simulates a real API (POST /simulate)
  Logs the sequence of workflow execution
  Helps test without server setup

  
5. What I Would Add With More Time
  1. Full Backend Integration
     Real email sending service
     Real PDF generation
     Database storage of workflows
     User authentication

  2. Better UI/UX
     Node color themes
     Drag-to-select  
    Minimap improvements
    Undo/redo system

  3. Export & Import
     Export workflow as JSON
     Import workflow back into canvas

  4. Real Execution Engine
    Execute workflows on server
    Track running instance progress
    Show workflow history




Output:
  <img width="1912" height="915" alt="image" src="https://github.com/user-attachments/assets/57dec3d5-06b8-4dbe-bf26-b2e7f18c2955" />

