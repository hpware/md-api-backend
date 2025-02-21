import supabase from "../../../components/supabase";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "key");
  const body = await readRawBody(event);
  const UpdateMD = await supabase
    .from("markdown")
    .update({ content: body })
    .eq("ip", slug)
  return {
    slug: slug,
  };
});
