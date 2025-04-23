import postgres from "postgres";

const sql = postgres(process.env.postgresql)

export default sql;