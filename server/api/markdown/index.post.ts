import supabase from "../../../components/supabase";
import genSlug from "../../../components/genSlug";
import { v4 as uuidv4 } from "uuid";

export default defineEventHandler(async (event) => {
  const date = event.headers.get("date");
  const body = await readRawBody(event);
  const slug = await genSlug(6);
  const uuid = await uuidv4();
  const InsertMD = await supabase
    .from("markdown")
    .insert([{ slug: slug, content: body, date_created: date, ip: uuid }]);
  return {
    slug: slug,
    password: uuid,
    error: InsertMD.error
  };
});
