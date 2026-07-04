"use server";

import type { ApplicationSession } from "@/features/auth";

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
