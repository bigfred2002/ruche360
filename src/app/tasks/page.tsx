import { TasksShellPreview } from "@/components/TasksShellPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { listHivesForSessionAction } from "@/features/apiary/actions";
import { listTasksForSessionAction } from "@/features/tasks/actions";

export const dynamic = "force-dynamic";

export default async function TasksPage() {
  const session = createDevelopmentApplicationSession();
  const [tasks, hives] = await Promise.all([
    listTasksForSessionAction(session).catch(() => null),
    listHivesForSessionAction(session).catch(() => null),
  ]);

  return <TasksShellPreview hives={hives} tasks={tasks} />;
}
