export const nodeDefaults = {
  start: { title: "Start", metadata: {} },
  task: { title: "Task", description: "", assignee: "", dueDate: "", customFields: {} },
  approval: { title: "Approval", role: "Manager", autoApproveThreshold: 0 },
  automated: { title: "Automation", actionId: "", params: {} },
  end: { message: "Completed", summary: false }
};
