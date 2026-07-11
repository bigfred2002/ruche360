import type { PrismaClient } from "@prisma/client";

import {
  assertCanReadTasks,
  assertCanWriteTasks,
  type TaskActionContext,
} from "./access";
import { canEditTask } from "./status";
import { prisma } from "./prisma";
import type { TaskPriority, TaskStatus, TaskSummary } from "./types";
import {
  normalizeOptionalDate,
  normalizeOptionalText,
  requireTaskPriority,
  requireTaskStatus,
  requireText,
} from "./validation";

type TaskReader = Pick<
  PrismaClient,
  "apiary" | "hive" | "colony" | "visit" | "membership" | "task"
>;
type TaskDatabase = TaskReader & Pick<PrismaClient, "$transaction">;

export type TaskCommandResult<T> = {
  ok: true;
  data: T;
};

export type CreateTaskInput = {
  title: string;
  description?: string | null;
  apiaryId?: string | null;
  hiveId?: string | null;
  colonyId?: string | null;
  visitId?: string | null;
  assignedToMembershipId?: string | null;
  status?: string | null;
  priority?: string | null;
  dueAt?: Date | string | null;
};

export type CreateHiveFirstTaskInput = Omit<
  CreateTaskInput,
  "apiaryId" | "colonyId" | "hiveId"
> & {
  hiveId?: string | null;
};

export type UpdateTaskStatusInput = {
  taskId: string;
  status: string;
};

export type AssignTaskInput = {
  taskId: string;
  assignedToMembershipId?: string | null;
};

export async function listTasks(
  context: TaskActionContext,
  db: TaskReader = prisma,
): Promise<TaskSummary[]> {
  assertCanReadTasks(context);

  const tasks = await db.task.findMany({
    where: {
      organizationId: context.organizationId,
      archivedAt: null,
    },
    orderBy: [{ dueAt: "asc" }, { createdAt: "desc" }],
  });

  return tasks.map(toTaskSummary);
}

export async function createTask(
  context: TaskActionContext,
  input: CreateTaskInput,
  db: TaskDatabase = prisma,
): Promise<TaskCommandResult<TaskSummary>> {
  assertCanWriteTasks(context);

  return db.$transaction((tx) => createTaskRecord(context, input, tx));
}

export async function createHiveFirstTask(
  context: TaskActionContext,
  input: CreateHiveFirstTaskInput,
  db: TaskDatabase = prisma,
): Promise<TaskCommandResult<TaskSummary>> {
  assertCanWriteTasks(context);

  return db.$transaction(async (tx) => {
    const hiveId = normalizeOptionalText(input.hiveId);

    if (!hiveId) {
      return createTaskRecord(context, input, tx);
    }

    const hive = await tx.hive.findFirstOrThrow({
      where: {
        id: hiveId,
        organizationId: context.organizationId,
        status: "ACTIVE",
        archivedAt: null,
      },
    });
    const colony = await tx.colony.findFirst({
      where: {
        organizationId: context.organizationId,
        hiveId: hive.id,
        status: "ACTIVE",
        archivedAt: null,
      },
      orderBy: [{ updatedAt: "desc" }, { createdAt: "desc" }],
    });

    return createTaskRecord(
      context,
      {
        ...input,
        apiaryId: hive.apiaryId,
        colonyId: colony?.id ?? null,
        hiveId: hive.id,
      },
      tx,
    );
  });
}

export async function updateTaskStatus(
  context: TaskActionContext,
  input: UpdateTaskStatusInput,
  db: TaskDatabase = prisma,
): Promise<TaskCommandResult<TaskSummary>> {
  assertCanWriteTasks(context);

  return db.$transaction(async (tx) => {
    const task = await tx.task.findFirstOrThrow({
      where: {
        id: requireText(input.taskId, "La tache"),
        organizationId: context.organizationId,
      },
    });

    if (!canEditTask(task.status)) {
      throw new Error("Une tache terminee, annulee ou archivee ne peut plus etre modifiee.");
    }

    const status = requireTaskStatus(input.status);
    const updatedTask = await tx.task.update({
      where: { id: task.id },
      data: {
        status,
        completedAt: status === "DONE" ? new Date() : task.completedAt,
      },
    });

    return { ok: true, data: toTaskSummary(updatedTask) };
  });
}

export async function assignTask(
  context: TaskActionContext,
  input: AssignTaskInput,
  db: TaskDatabase = prisma,
): Promise<TaskCommandResult<TaskSummary>> {
  assertCanWriteTasks(context);

  return db.$transaction(async (tx) => {
    const task = await tx.task.findFirstOrThrow({
      where: {
        id: requireText(input.taskId, "La tache"),
        organizationId: context.organizationId,
      },
    });

    if (!canEditTask(task.status)) {
      throw new Error("Une tache terminee, annulee ou archivee ne peut plus etre assignee.");
    }

    const assignedToMembershipId = normalizeOptionalText(input.assignedToMembershipId);
    await assertMembershipBelongsToOrganization(tx, context.organizationId, assignedToMembershipId);

    const updatedTask = await tx.task.update({
      where: { id: task.id },
      data: { assignedToMembershipId },
    });

    return { ok: true, data: toTaskSummary(updatedTask) };
  });
}

function assertTaskCanBeCreatedWithStatus(status: TaskStatus): void {
  if (status === "DONE" || status === "ARCHIVED") {
    throw new Error("Une nouvelle tache doit demarrer a faire ou en cours.");
  }
}

async function createTaskRecord(
  context: TaskActionContext,
  input: CreateTaskInput,
  db: TaskReader,
): Promise<TaskCommandResult<TaskSummary>> {
  const apiaryId = normalizeOptionalText(input.apiaryId);
  const hiveId = normalizeOptionalText(input.hiveId);
  const colonyId = normalizeOptionalText(input.colonyId);
  const visitId = normalizeOptionalText(input.visitId);
  const assignedToMembershipId = normalizeOptionalText(input.assignedToMembershipId);
  const status = input.status ? requireTaskStatus(input.status) : "TODO";
  const priority = input.priority ? requireTaskPriority(input.priority) : "NORMAL";

  assertTaskCanBeCreatedWithStatus(status);
  await assertApiaryBelongsToOrganization(db, context.organizationId, apiaryId);
  await assertHiveBelongsToOrganization(db, context.organizationId, hiveId);
  await assertColonyBelongsToOrganization(db, context.organizationId, colonyId);
  await assertVisitBelongsToOrganization(db, context.organizationId, visitId);
  await assertMembershipBelongsToOrganization(
    db,
    context.organizationId,
    assignedToMembershipId,
  );

  const task = await db.task.create({
    data: {
      organizationId: context.organizationId,
      apiaryId,
      hiveId,
      colonyId,
      visitId,
      createdByMembershipId: context.membershipId ?? null,
      assignedToMembershipId,
      title: requireText(input.title, "Le titre de tache"),
      description: normalizeOptionalText(input.description),
      status,
      priority,
      dueAt: normalizeOptionalDate(input.dueAt),
    },
  });

  return { ok: true, data: toTaskSummary(task) };
}

async function assertApiaryBelongsToOrganization(
  db: TaskReader,
  organizationId: string,
  apiaryId: string | null | undefined,
): Promise<void> {
  if (!apiaryId) {
    return;
  }

  await db.apiary.findFirstOrThrow({
    where: { id: apiaryId, organizationId, archivedAt: null },
  });
}

async function assertHiveBelongsToOrganization(
  db: TaskReader,
  organizationId: string,
  hiveId: string | null | undefined,
): Promise<void> {
  if (!hiveId) {
    return;
  }

  await db.hive.findFirstOrThrow({
    where: { id: hiveId, organizationId, archivedAt: null },
  });
}

async function assertColonyBelongsToOrganization(
  db: TaskReader,
  organizationId: string,
  colonyId: string | null | undefined,
): Promise<void> {
  if (!colonyId) {
    return;
  }

  await db.colony.findFirstOrThrow({
    where: { id: colonyId, organizationId, archivedAt: null },
  });
}

async function assertVisitBelongsToOrganization(
  db: TaskReader,
  organizationId: string,
  visitId: string | null | undefined,
): Promise<void> {
  if (!visitId) {
    return;
  }

  await db.visit.findFirstOrThrow({
    where: { id: visitId, organizationId, archivedAt: null },
  });
}

async function assertMembershipBelongsToOrganization(
  db: TaskReader,
  organizationId: string,
  membershipId: string | null | undefined,
): Promise<void> {
  if (!membershipId) {
    return;
  }

  await db.membership.findFirstOrThrow({
    where: { id: membershipId, organizationId, status: "ACTIVE" },
  });
}

function toTaskSummary(task: {
  id: string;
  organizationId: string;
  apiaryId: string | null;
  hiveId: string | null;
  colonyId: string | null;
  visitId: string | null;
  assignedToMembershipId: string | null;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueAt: Date | null;
}): TaskSummary {
  return {
    id: task.id,
    organizationId: task.organizationId,
    apiaryId: task.apiaryId,
    hiveId: task.hiveId,
    colonyId: task.colonyId,
    visitId: task.visitId,
    assignedToMembershipId: task.assignedToMembershipId,
    title: task.title,
    status: task.status,
    priority: task.priority,
    dueAt: task.dueAt,
  };
}
