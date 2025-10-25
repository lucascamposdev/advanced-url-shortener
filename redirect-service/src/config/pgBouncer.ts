import { Pool } from "pg"

const pgBouncer = new Pool({
  host: process.env.PGBOUNCER_HOST,
  port: 6432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

export const testPgBouncerConnection = async (): Promise<void> => {
  try {
    const { rows } = await pgBouncer.query("SELECT current_database();")
    const [res] = rows
    console.log(res)
  } catch (err) {
    console.error("Erro ao executar query:", err)
  }
}

export default pgBouncer
