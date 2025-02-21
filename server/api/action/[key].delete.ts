import supabase from "../../../components/supabase";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "key");
  const DeleteMD = await supabase
    .from("markdown")
    .delete()
    .eq("ip", slug);
  return {
    slug: slug,
  };
});
