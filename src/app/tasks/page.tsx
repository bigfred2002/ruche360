import { TasksShellPreview } from "@/components/TasksShellPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listTasksForSessionAction } from "@/features/tasks/actions";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const session = createDevelopmentApplicationSession();
  const tasks = await listTasksForSessionAction(session).catch(() => null);

  return <TasksShellPreview tasks={tasks} />;
}
