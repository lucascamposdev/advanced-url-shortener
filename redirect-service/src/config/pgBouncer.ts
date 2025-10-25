import { Pool } from "pg"

const pgBouncer = new Pool({
  host: process.env.PGBOUNCER_HOST,
  port: 6432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

export default pgBouncer
