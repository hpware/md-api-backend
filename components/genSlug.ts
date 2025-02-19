import * as db from "@supabase/supabase-js";
const supabase = db.createClient(
    process.env.supabase_domain,
    process.env.supabase_key
)

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
export default async function(length) {
    try {
        let slug = ""
        for (let times = 0; times < length; times++) {
            slug += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        const check = await supabase.from("slugs").select("*").eq("slug","asd");
        if (check.data = []) {
            return slug;
        } else {
            slug += characters.charAt(Math.floor(Math.random() * characters.length)) 
            const check2= await supabase.from("slugs").select("*").eq("slug","asd");
            if (check2.data = []) {
                return slug;
            }  
        }
    } catch (e) {
        console.log(e);
    }
}