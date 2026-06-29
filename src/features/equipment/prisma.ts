import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  rucher360Prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.rucher360Prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.rucher360Prisma = prisma;
}
