import { setupWorker } from "msw/browser";
import { http, HttpResponse } from "msw";

export const worker = setupWorker(

  http.post("/simulate", async ({ request }) => {
    try {
      const body = await request.json();
      const nodes = body.nodes || [];
      let logs = [];

      logs.push("Workflow Simulation Started");

      nodes.forEach((node) => {
        logs.push(`Step: ${node.type}`);

        if (node.type === "automated") {
          logs.push(` - Automated action: ${node.data.actionId}`);
          if (node.data.params) {
            Object.entries(node.data.params).forEach(([key, val]) =>
              logs.push(`   • ${key}: ${val}`)
            );
          }
        }

        if (node.type === "approval") {
          logs.push(` - Approval required by: ${node.data.role}`);
        }
      });

      logs.push("Workflow Simulation Complete");

      return HttpResponse.json({ log: logs });
    } catch (error) {
      return HttpResponse.json(
        { error: "Invalid JSON or server error" },
        { status: 500 }
      );
    }
  })
);
