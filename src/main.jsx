import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

// start msw mock server in dev
if (import.meta.env.MODE === "development") {
  import("./api/mswMockServer").then(({ worker }) => {
    worker.start();
  });
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
