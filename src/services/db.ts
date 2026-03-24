import { ENV } from "../config/env.constant.js";
import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
  connectionString: ENV.DATABASE_URL,
  ssl:{
    rejectUnauthorized:false
  }
});
export const prisma = new PrismaClient({ adapter });