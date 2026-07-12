import { notFound } from "next/navigation";

import { TaskDetailPreview } from "@/components/TaskDetailPreview";
import { createDevelopmentApplicationSession } from "@/features/auth";
import { getTaskDetailForSessionAction } from "@/features/tasks/actions";

export const dynamic = "force-dynamic";

type TaskDetailPageProps = {
  params: Promise<{
    taskId: string;
  }>;
};

export default async function TaskDetailPage({ params }: TaskDetailPageProps) {
  const { taskId } = await params;
  const session = createDevelopmentApplicationSession();
  const task = await getTaskDetailForSessionAction(session, taskId);

  if (!task) {
    notFound();
  }

  return <TaskDetailPreview task={task} />;
}
