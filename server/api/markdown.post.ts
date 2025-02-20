import supabase from "../../components/supabase"

export default defineEventHandler(async (event) => {
    const slug = getRouterParam(event, 'slug');
    const getMD = supabase.from("markdown").select("*").eq("slug", slug);
    if (true) {
        
    }
    return {
        hi: "world"
    }
})