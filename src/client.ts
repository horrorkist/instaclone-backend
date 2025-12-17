import "dotenv/config"; // ✅ 제일 위에
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const url = process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;
if (!url) throw new Error("Missing DATABASE_URL (or DIRECT_DATABASE_URL)");
// console.log("DB host =", new URL(url).host);

const adapter = new PrismaPg({ connectionString: url });

const globalForPrisma = global as unknown as { client: PrismaClient };

const client =
  globalForPrisma.client ||
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.client = client;

export default client;
