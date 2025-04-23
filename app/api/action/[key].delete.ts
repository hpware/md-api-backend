//import supabase from "../../../components/supabase";
import p from "../../../components/database";

export default defineEventHandler(async (event) => {
  try {
  const slug = getRouterParam(event, "key");
  /*const DeleteMD = await supabase
    .from("markdown")
    .delete()
    .eq("ip", slug);
    */
   const DeleteMD = await p`
   delete from markdown
   where ip = ${slug}
   `
    if (!DeleteMD || DeleteMD === null || DeleteMD === undefined)  {
      throw createError({
        statusCode: 500,
        message: DeleteMD.toString(),
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
