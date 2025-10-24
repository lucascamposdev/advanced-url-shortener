import { Pool } from "pg"

const pgBouncer = new Pool({
  host: process.env.PGBOUNCER_HOST,
  port: 6432,
  user: "docker",
  password: "docker",
  database: "url-shortener-db"
})

export const testConnection = async () => {
  console.log("start")
  try {
    const { rows } = await pgBouncer.query("SELECT current_database();")
    const [res] = rows
    console.log(res)
  } catch (err) {
    console.error("Erro ao executar query:", err)
  }
}

export default pgBouncer
