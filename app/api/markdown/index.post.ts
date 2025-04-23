//import supabase from "../../../components/supabase";
import p from "../../../components/database";
import genSlug from "../../../components/genSlug";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  try {
  const date = new Date().toISOString();
  const body = readRawBody(event);
  const slug = await genSlug(6);
  const uuid = await uuidv4();
  /*const InsertMD = await supabase
    .from("markdown")
    .insert([{ slug: slug, content: body, date_created: date, ip: uuid }]);
    if (InsertMD.error) {
      throw createError({
        statusCode: Number(InsertMD.error.code),
        message: InsertMD.error.message,
      })
    }
    */
   const InsertMD = p`
   insert into markdown (slug, content, date_created, ip)
   value ("${slug}", "${body}", "${date}", "${uuid}")
   `
  return {
    slug: slug,
    password: uuid,
    error: null
  };
} catch (e) {
  return {
    slug: null,
    password: null,
    error: e,
  }
}
});
