"use server";

import type { ApplicationSession } from "@/features/auth";

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
