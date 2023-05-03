import pg from "pg";

// Create a pool of database connections
export const pool = new pg.Pool({
  user: process.env.POSTGRES_USER || "postgres",
  host: process.env.POSTGRES_HOST || "localhost",
  database: process.env.POSTGRES_DB || "solicy",
  password: process.env.POSTGRES_PASS || "5365616",
  port: process.env.POSTGRES_PORT || 5432,
});
