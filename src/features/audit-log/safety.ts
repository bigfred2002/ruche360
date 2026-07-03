const sensitiveMetadataKeys = new Set([
  "password",
  "token",
  "secret",
  "apiKey",
  "privateKey",
  "email",
  "phone",
  "latitude",
  "longitude",
]);

export function isAllowedActivityMetadataKey(key: string): boolean {
  return !sensitiveMetadataKeys.has(key);
}

export function filterActivityMetadata(
  metadata: Record<string, string | number | boolean | null>,
): Record<string, string | number | boolean | null> {
  return Object.fromEntries(
    Object.entries(metadata).filter(([key]) => isAllowedActivityMetadataKey(key)),
  );
}
