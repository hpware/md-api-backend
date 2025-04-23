//import supabase from "../../components/supabase";
import p from "../../components/database";
export default defineEventHandler(async (event) => {
  const slugorg = getRouterParam(event, "slug").replace("/", ",");
  try {
    setHeader(event, "Content-Type", "text/markdown");
    let slug = "";
    if (slugorg.includes(",json") || slugorg.includes("json,")) {
      slug = slugorg.replace("json", "").replace(",", "");
      setHeader(event, "Content-Type", "application/json");
    } else {
      slug = slugorg;
    }
    /*const getMD = await supabase
      .from("markdown")
      .select("*")
      .eq("slug", `${slug}`)
      .maybeSingle();
      */
    const getMD = await p`
      select * from markdown
      where slug = ${slug}
    `
    const data = getMD;
    if (slugorg.includes(",json") || slugorg.includes("json,")) {
      if (!data || data === null || data === undefined) {
        return data;
      } else {
        return {
          slug: data.slug,
          content: data.content,
          date_created: data.date_created,
          error: false,
          errordata: null,
        };
      }
    } else {
      if (!data || data === null || data == undefined) {
        return "## Content not found";
      }
      return data.content;
    }
  } catch (e) {
    if (slugorg.includes(",json") || slugorg.includes("json,")) {
      setHeader(event, "Content-Type", "application/json");
      return {
        slug:  null,
        content: `## Oops! An error has accoured
          Error: ${e.message}
        `,
        date_created: null,
        error: true,
        errordata: e
      }
    } else {
      setHeader(event, "Content-Type", "text/markdown");
      return `## Oops! An error has accoured
        Error: ${e.message}
      `
    }
  }
});