import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.DATABASE_URL, "==============");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export default pool;
