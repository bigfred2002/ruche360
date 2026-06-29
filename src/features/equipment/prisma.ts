import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  rucher360Prisma?: PrismaClient;
  rucher360PrismaPool?: Pool;
};

const pool =
  globalForPrisma.rucher360PrismaPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.rucher360Prisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.rucher360Prisma = prisma;
  globalForPrisma.rucher360PrismaPool = pool;
}
