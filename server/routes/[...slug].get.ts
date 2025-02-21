import supabase from "../../components/supabase";
import { v4 as uuidv4 } from "uuid";
export default defineEventHandler(async (event) => {
  try {
    setHeader(event, "Content-Type", "text/markdown");
    const slugorg = getRouterParam(event, "slug").replace("/", ",");
    const etag = event.headers.get("etag");
    const date = event.headers.get("date");
    let slug = "";
    if (slugorg.includes(",json") || slugorg.includes("json,")) {
      slug = slugorg.replace("json", "").replace(",", "");
      setHeader(event, "Content-Type", "application/json");
    } else {
      slug = slugorg;
    }
    const getMD = await supabase
      .from("markdown")
      .select("*")
      .eq("slug", `${slug}`)
      .maybeSingle();
    // Its just maybe single, I have no clue what does it do.
    const data = getMD;
    if (slugorg.includes(",json") || slugorg.includes("json,")) {
      if (!data.data || data.data === null) {
        return data;
      } else {
        return {
          slug: data.data.slug,
          content: data.data.content,
          date_created: data.data.date_created,
          event: etag,
        };
      }
    } else {
      if (!data.data || data.data === null) {
        return "## Content not found";
      }
      return data.data.content;
    }
  } catch (e) {
    console.log(e);
  }
});
