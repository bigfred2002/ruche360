"use server";

import { revalidatePath } from "next/cache";

import type { ApplicationSession } from "@/features/auth";
import { createDevelopmentApplicationSession } from "@/features/auth";

import type { HealthActionContext } from "./access";
import { createHealthActionContextFromSession } from "./session-context";
import {
  createHealthObservation,
  createHornetRecord,
  createVarroaRecord,
  listHealthObservations,
  listHornetRecords,
  listVarroaRecords,
  type CreateHealthObservationInput,
  type CreateHornetRecordInput,
  type CreateVarroaRecordInput,
} from "./service";

export async function listHealthObservationsAction(context: HealthActionContext) {
  return listHealthObservations(context);
}

export async function listHealthObservationsForSessionAction(
  session: ApplicationSession,
) {
  return listHealthObservations(createHealthActionContextFromSession(session));
}

export async function listVarroaRecordsAction(context: HealthActionContext) {
  return listVarroaRecords(context);
}

export async function listVarroaRecordsForSessionAction(session: ApplicationSession) {
  return listVarroaRecords(createHealthActionContextFromSession(session));
}

export async function listHornetRecordsAction(context: HealthActionContext) {
  return listHornetRecords(context);
}

export async function listHornetRecordsForSessionAction(session: ApplicationSession) {
  return listHornetRecords(createHealthActionContextFromSession(session));
}

export async function createHealthObservationAction(
  context: HealthActionContext,
  input: CreateHealthObservationInput,
) {
  return createHealthObservation(context, input);
}

export async function createHealthObservationForSessionAction(
  session: ApplicationSession,
  input: CreateHealthObservationInput,
) {
  return createHealthObservation(createHealthActionContextFromSession(session), input);
}

export async function createVarroaRecordAction(
  context: HealthActionContext,
  input: CreateVarroaRecordInput,
) {
  return createVarroaRecord(context, input);
}

export async function createVarroaRecordForSessionAction(
  session: ApplicationSession,
  input: CreateVarroaRecordInput,
) {
  return createVarroaRecord(createHealthActionContextFromSession(session), input);
}

export async function createHornetRecordAction(
  context: HealthActionContext,
  input: CreateHornetRecordInput,
) {
  return createHornetRecord(context, input);
}

export async function createHornetRecordForSessionAction(
  session: ApplicationSession,
  input: CreateHornetRecordInput,
) {
  return createHornetRecord(createHealthActionContextFromSession(session), input);
}

export async function createDevelopmentHealthObservationFormAction(
  formData: FormData,
) {
  const session = createDevelopmentApplicationSession();

  await createHealthObservationForSessionAction(session, {
    apiaryId: readOptionalFormText(formData, "apiaryId"),
    hiveId: readOptionalFormText(formData, "hiveId"),
    colonyId: readOptionalFormText(formData, "colonyId"),
    visitId: readOptionalFormText(formData, "visitId"),
    category: readOptionalFormText(formData, "category"),
    severity: readOptionalFormText(formData, "severity"),
    observedAt: readOptionalFormText(formData, "observedAt"),
    label: readFormText(formData, "label"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidateHealthPaths();
}

export async function createDevelopmentVarroaRecordFormAction(
  formData: FormData,
) {
  const session = createDevelopmentApplicationSession();

  await createVarroaRecordForSessionAction(session, {
    apiaryId: readOptionalFormText(formData, "apiaryId"),
    hiveId: readOptionalFormText(formData, "hiveId"),
    colonyId: readOptionalFormText(formData, "colonyId"),
    visitId: readOptionalFormText(formData, "visitId"),
    method: readOptionalFormText(formData, "method"),
    observedAt: readOptionalFormText(formData, "observedAt"),
    miteCount: readOptionalFormText(formData, "miteCount"),
    sampleSize: readOptionalFormText(formData, "sampleSize"),
    infestationRate: readOptionalFormText(formData, "infestationRate"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidateHealthPaths();
}

export async function createDevelopmentHornetRecordFormAction(
  formData: FormData,
) {
  const session = createDevelopmentApplicationSession();

  await createHornetRecordForSessionAction(session, {
    apiaryId: readOptionalFormText(formData, "apiaryId"),
    visitId: readOptionalFormText(formData, "visitId"),
    pressure: readOptionalFormText(formData, "pressure"),
    observedAt: readOptionalFormText(formData, "observedAt"),
    hornetCount: readOptionalFormText(formData, "hornetCount"),
    trapCount: readOptionalFormText(formData, "trapCount"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidateHealthPaths();
}

function revalidateHealthPaths() {
  revalidatePath("/health");
  revalidatePath("/health/varroa");
  revalidatePath("/health/hornet");
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
