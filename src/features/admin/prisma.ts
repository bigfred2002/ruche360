import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const globalForPrisma = globalThis as unknown as {
  rucher360AdminPrisma?: PrismaClient;
  rucher360AdminPrismaPool?: Pool;
};

const pool =
  globalForPrisma.rucher360AdminPrismaPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
  });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.rucher360AdminPrisma ??
  new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.rucher360AdminPrisma = prisma;
  globalForPrisma.rucher360AdminPrismaPool = pool;
}
