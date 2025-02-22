import supabase from "../../components/supabase";
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
    const getMD = await supabase
      .from("markdown")
      .select("*")
      .eq("slug", `${slug}`)
      .maybeSingle();
    const data = getMD;
    if (slugorg.includes(",json") || slugorg.includes("json,")) {
      if (!data.data || data.data === null) {
        return data;
      } else {
        return {
          slug: data.data.slug,
          content: data.data.content,
          date_created: data.data.date_created,
          error: false,
        };
      }
    } else {
      if (!data.data || data.data === null) {
        return "## Content not found";
      }
      return data.data.content;
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
      }
    } else {
      setHeader(event, "Content-Type", "text/markdown");
      return `## Oops! An error has accoured
        Error: ${e.message}
      `
    }
  }
});