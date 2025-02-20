import supabase from "../../components/supabase"

export default defineEventHandler(async (event) => {
    try {
    const slug = await getRouterParam(event, 'slug');
    console.log(slug)
    // maybeSingle?
    const getMD = await supabase.from("markdown").select("*").eq("slug", slug).maybeSingle();
    console.log(getMD)
    if (true) {
        
    }
    return {
        hi: "world"
    }
} catch (e) {
    console.log(e);
}
})