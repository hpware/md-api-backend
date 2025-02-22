import supabase from "../../../components/supabase";

export default defineEventHandler(async (event) => {
  try {
  const slug = getRouterParam(event, "key");
  const DeleteMD = await supabase
    .from("markdown")
    .delete()
    .eq("ip", slug);
    if (DeleteMD.error) {
      throw createError({
        statusCode: Number(DeleteMD.error.code),
        message: DeleteMD.error.message,
      })
    }
  return {
    slug: slug,
    status: "success",
    error: null
  };
} catch (e) {
  return {
    slug: null,
    status: "failed",
    error: e,
  }
}
});
