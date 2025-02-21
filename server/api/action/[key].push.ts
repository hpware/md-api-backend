import supabase from "../../../components/supabase";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const UpdateMD = await supabase
    .from("markdown")
    .insert([{ slug: slug, content: body, date_created: date, ip: uuid }]);
  return {
    slug: slug,
  };
});
