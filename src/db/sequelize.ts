import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.POSTGRES_DB || "solicy",
  process.env.POSTGRES_USER || "postgres",
  process.env.POSTGRES_PASS || "5365616",
  {
    host: "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    dialect: "postgres",
  }
);
