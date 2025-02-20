import supabase from "../../components/supabase";

export default defineEventHandler(async (event) => {
  try {
    const slug = getRouterParam(event, "slug");
    console.log(slug);
    // maybeSingle? 極度🏚️
    const getMD = await supabase
      .from("markdown")
      .select("*")
      .eq("slug", `${slug}`)
      .maybeSingle();
    console.log(getMD);
    if (true) {
    }
    return {
      hi: "world",
      c: getMD,
    };
  } catch (e) {
    console.log(e);
  }
});
