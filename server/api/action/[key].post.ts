import supabase from "../../../components/supabase";

export default defineEventHandler(async (event) => {
  try {
  const slug = getRouterParam(event, "key");
  const body = await readRawBody(event);
  const UpdateMD = await supabase
    .from("markdown")
    .update({ content: body })
    .eq("ip", slug)
    .select('*')
  if (UpdateMD.error) {
    throw createError({
      statusCode: Number(UpdateMD.error.code),
      message: UpdateMD.error.message,
    })
  }
  return {
    slug: UpdateMD.data[0].slug,
    error: null,
  };
} catch (e) {
  return {
    slug: null,
    error: e
  }
}
});
