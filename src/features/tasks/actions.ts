"use server";

import { revalidatePath } from "next/cache";

import type { ApplicationSession } from "@/features/auth";
import { createDevelopmentApplicationSession } from "@/features/auth";

import type { TaskActionContext } from "./access";
import { createTaskActionContextFromSession } from "./session-context";
import {
  assignTask,
  createTask,
  listTasks,
  updateTaskStatus,
  type AssignTaskInput,
  type CreateTaskInput,
  type UpdateTaskStatusInput,
} from "./service";

export async function listTasksAction(context: TaskActionContext) {
  return listTasks(context);
}

export async function listTasksForSessionAction(session: ApplicationSession) {
  return listTasks(createTaskActionContextFromSession(session));
}

export async function createTaskAction(
  context: TaskActionContext,
  input: CreateTaskInput,
) {
  return createTask(context, input);
}

export async function createTaskForSessionAction(
  session: ApplicationSession,
  input: CreateTaskInput,
) {
  return createTask(createTaskActionContextFromSession(session), input);
}

export async function updateTaskStatusAction(
  context: TaskActionContext,
  input: UpdateTaskStatusInput,
) {
  return updateTaskStatus(context, input);
}

export async function updateTaskStatusForSessionAction(
  session: ApplicationSession,
  input: UpdateTaskStatusInput,
) {
  return updateTaskStatus(createTaskActionContextFromSession(session), input);
}

export async function assignTaskAction(
  context: TaskActionContext,
  input: AssignTaskInput,
) {
  return assignTask(context, input);
}

export async function assignTaskForSessionAction(
  session: ApplicationSession,
  input: AssignTaskInput,
) {
  return assignTask(createTaskActionContextFromSession(session), input);
}

export async function createDevelopmentTaskFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createTaskForSessionAction(session, {
    title: readFormText(formData, "title"),
    description: readOptionalFormText(formData, "description"),
    apiaryId: readOptionalFormText(formData, "apiaryId"),
    hiveId: readOptionalFormText(formData, "hiveId"),
    colonyId: readOptionalFormText(formData, "colonyId"),
    visitId: readOptionalFormText(formData, "visitId"),
    assignedToMembershipId: readOptionalFormText(formData, "assignedToMembershipId"),
    status: readOptionalFormText(formData, "status"),
    priority: readOptionalFormText(formData, "priority"),
    dueAt: readOptionalFormText(formData, "dueAt"),
  });

  revalidatePath("/tasks");
}

export async function updateDevelopmentTaskStatusFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await updateTaskStatusForSessionAction(session, {
    taskId: readFormText(formData, "taskId"),
    status: readFormText(formData, "status"),
  });

  revalidatePath("/tasks");
}

export async function assignDevelopmentTaskFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await assignTaskForSessionAction(session, {
    taskId: readFormText(formData, "taskId"),
    assignedToMembershipId: readOptionalFormText(formData, "assignedToMembershipId"),
  });

  revalidatePath("/tasks");
}

function readFormText(formData: FormData, key: string) {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return "";
  }

  return value;
}

function readOptionalFormText(formData: FormData, key: string) {
  const value = readFormText(formData, key).trim();

  return value.length > 0 ? value : null;
}
