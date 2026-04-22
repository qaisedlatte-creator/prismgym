import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createClient() {
  if (!process.env.DATABASE_URL) {
    // No DB configured (build/preview) — return stubbed client
    return {} as PrismaClient;
  }
  try {
    // Prisma v7: pass adapter via constructor
    const { Pool } = require("pg") as typeof import("pg");
    const { PrismaPg } = require("@prisma/adapter-pg") as typeof import("@prisma/adapter-pg");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter } as any);
  } catch {
    return new PrismaClient();
  }
}

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

export default prisma;
