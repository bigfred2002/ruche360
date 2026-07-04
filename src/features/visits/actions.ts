"use server";

import type { ApplicationSession } from "@/features/auth";

import type { VisitActionContext } from "./access";
import { createVisitActionContextFromSession } from "./session-context";
import {
  addVisitObservation,
  createVisit,
  listVisits,
  updateVisitStatus,
  type AddVisitObservationInput,
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
