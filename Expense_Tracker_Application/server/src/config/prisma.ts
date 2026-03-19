import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// const prisma = new PrismaClient({
//   adapter: new PrismaPg(
//     new Pool({
//       connectionString: process.env.DATABASE_URL,
//     }) as any
//   ),
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter: new PrismaPg(pool as any),
});

export default prisma;
