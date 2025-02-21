import supabase from "../../../components/supabase";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug");
  const UpdateMD = supabase
    .from("markdown")
    .update({})
    .eq("slug", "index")
    .select();
  return {
    slug: slug,
  };
});
