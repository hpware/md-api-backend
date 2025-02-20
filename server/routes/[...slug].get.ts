import supabase from "../../components/supabase";

export default defineEventHandler(async (event) => {
  try {
    setHeader(event, "Content-Type", "text/markdown")
    const slug = getRouterParam(event, "slug");
    const getMD = await supabase
      .from("markdown")
      .select("*")
      .eq("slug", `${slug}`)
      .maybeSingle();
      // Its just maybe single, I have no clue what does do.
      const data = getMD;
      if (!data.data || data.data === null) {
        return "Content not found"
      } else {
        return data.data.content
      }
  } catch (e) {
    console.log(e);
  }
});
