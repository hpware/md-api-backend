import supabase from "../../components/supabase";
import { v4 as uuidv4 } from "uuid";
export default defineEventHandler(async (event) => {
  try {
    setHeader(event, "Content-Type", "text/markdown")
    const slugorg = getRouterParam(event, "slug").replace("/", ",");
    const etag = event.headers.get("etag");
    const date = event.headers.get("date");
    console.log(slugorg)
    let slug = ""
    let slugboolean = false;
    if (slugorg.includes(",json") || slugorg.includes("json,")) {
        slug = slugorg.replace("json", "").replace(",", "");
        slugboolean = true;
    } else {
        slug = slugorg
    }
    const getMD = await supabase
      .from("markdown")
      .select("*")
      .eq("slug", `${slug}`)
      .maybeSingle();
      // Its just maybe single, I have no clue what does do.
      const data = getMD;
      if (slugboolean = true) {
        if (!data.data || data.data === null) {
            return data
          } else {
            return {
                slug: data.data.slug,
                content: data.data.content,
                date_created: data.data.date_created,
                event: etag,
            }
          }
      } else {
        if (!data.data || data.data === null) {
            return "## Content not found"
          } else {
            return data.data.content
          }
      }
  } catch (e) {
    console.log(e);
  }
});
