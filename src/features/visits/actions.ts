"use server";

import { revalidatePath } from "next/cache";

import type { ApplicationSession } from "@/features/auth";
import { createDevelopmentApplicationSession } from "@/features/auth";

import type { VisitActionContext } from "./access";
import { createVisitActionContextFromSession } from "./session-context";
import {
  addVisitObservation,
  createHiveFirstVisit,
  createVisit,
  listVisits,
  updateVisitStatus,
  type AddVisitObservationInput,
  type CreateHiveFirstVisitInput,
  type CreateVisitInput,
  type UpdateVisitStatusInput,
} from "./service";

export async function listVisitsAction(context: VisitActionContext) {
  return listVisits(context);
}

export async function listVisitsForSessionAction(session: ApplicationSession) {
  return listVisits(createVisitActionContextFromSession(session));
}

export async function createVisitAction(
  context: VisitActionContext,
  input: CreateVisitInput,
) {
  return createVisit(context, input);
}

export async function createVisitForSessionAction(
  session: ApplicationSession,
  input: CreateVisitInput,
) {
  return createVisit(createVisitActionContextFromSession(session), input);
}

export async function createHiveFirstVisitForSessionAction(
  session: ApplicationSession,
  input: CreateHiveFirstVisitInput,
) {
  return createHiveFirstVisit(createVisitActionContextFromSession(session), input);
}

export async function updateVisitStatusAction(
  context: VisitActionContext,
  input: UpdateVisitStatusInput,
) {
  return updateVisitStatus(context, input);
}

export async function updateVisitStatusForSessionAction(
  session: ApplicationSession,
  input: UpdateVisitStatusInput,
) {
  return updateVisitStatus(createVisitActionContextFromSession(session), input);
}

export async function addVisitObservationAction(
  context: VisitActionContext,
  input: AddVisitObservationInput,
) {
  return addVisitObservation(context, input);
}

export async function addVisitObservationForSessionAction(
  session: ApplicationSession,
  input: AddVisitObservationInput,
) {
  return addVisitObservation(createVisitActionContextFromSession(session), input);
}

export async function createDevelopmentVisitFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createHiveFirstVisitForSessionAction(session, {
    hiveId: readFormText(formData, "hiveId"),
    status: readOptionalFormText(formData, "status"),
    visitedAt: readOptionalFormText(formData, "visitedAt"),
    objective: readOptionalFormText(formData, "objective"),
    weatherSummary: readOptionalFormText(formData, "weatherSummary"),
    colonyStrength: readOptionalFormText(formData, "colonyStrength"),
    notes: readOptionalFormText(formData, "notes"),
    followUpSummary: readOptionalFormText(formData, "followUpSummary"),
  });

  revalidatePath("/visits");
}

export async function updateDevelopmentVisitStatusFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await updateVisitStatusForSessionAction(session, {
    visitId: readFormText(formData, "visitId"),
    status: readFormText(formData, "status"),
  });

  revalidatePath("/visits");
}

export async function addDevelopmentVisitObservationFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await addVisitObservationForSessionAction(session, {
    visitId: readFormText(formData, "visitId"),
    category: readFormText(formData, "category"),
    label: readFormText(formData, "label"),
    value: readOptionalFormText(formData, "value"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidatePath("/visits");
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
