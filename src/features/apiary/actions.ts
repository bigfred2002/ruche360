"use server";

import { revalidatePath } from "next/cache";

import type { ApplicationSession } from "@/features/auth";
import { createDevelopmentApplicationSession } from "@/features/auth";

import type { ApiaryActionContext } from "./access";
import { createApiaryActionContextFromSession } from "./session-context";
import {
  createApiary,
  createHive,
  getApiaryDetail,
  getHiveDetail,
  listApiaries,
  listHives,
  type CreateApiaryInput,
  type CreateHiveInput,
} from "./service";

export async function listApiariesAction(context: ApiaryActionContext) {
  return listApiaries(context);
}

export async function listApiariesForSessionAction(session: ApplicationSession) {
  return listApiaries(createApiaryActionContextFromSession(session));
}

export async function listHivesForSessionAction(session: ApplicationSession) {
  return listHives(createApiaryActionContextFromSession(session));
}

export async function getApiaryDetailForSessionAction(
  session: ApplicationSession,
  apiaryId: string,
) {
  return getApiaryDetail(createApiaryActionContextFromSession(session), apiaryId);
}

export async function getHiveDetailForSessionAction(
  session: ApplicationSession,
  hiveId: string,
) {
  return getHiveDetail(createApiaryActionContextFromSession(session), hiveId);
}

export async function createApiaryAction(
  context: ApiaryActionContext,
  input: CreateApiaryInput,
) {
  return createApiary(context, input);
}

export async function createApiaryForSessionAction(
  session: ApplicationSession,
  input: CreateApiaryInput,
) {
  return createApiary(createApiaryActionContextFromSession(session), input);
}

export async function createHiveAction(
  context: ApiaryActionContext,
  input: CreateHiveInput,
) {
  return createHive(context, input);
}

export async function createHiveForSessionAction(
  session: ApplicationSession,
  input: CreateHiveInput,
) {
  return createHive(createApiaryActionContextFromSession(session), input);
}

export async function createDevelopmentApiaryFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createApiaryForSessionAction(session, {
    name: readFormText(formData, "name"),
    description: readOptionalFormText(formData, "description"),
    locationDescription: readOptionalFormText(formData, "locationDescription"),
    accessNotes: readOptionalFormText(formData, "accessNotes"),
    status: readOptionalFormText(formData, "status"),
  });

  revalidatePath("/apiaries");
}

export async function createDevelopmentHiveFormAction(formData: FormData) {
  const session = createDevelopmentApplicationSession();

  await createHiveForSessionAction(session, {
    apiaryId: readOptionalFormText(formData, "apiaryId"),
    fieldIdentifier: readFormText(formData, "fieldIdentifier"),
    hiveType: readOptionalFormText(formData, "hiveType"),
    status: readOptionalFormText(formData, "status"),
    notes: readOptionalFormText(formData, "notes"),
  });

  revalidatePath("/apiaries");
  revalidatePath("/hives");
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
