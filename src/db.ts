import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const query = (text: string, params: (string | number | boolean | null)[]) => {
  return pool.query(text, params);
};
