//import * as db from "@supabase/supabase-js";
import p from "../components/database";
/*const supabase = db.createClient(
  process.env.supabase_domain,
  process.env.supabase_key,
);*/

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
export default async function (length) {
  try {
    let slug = "";
    for (let times = 0; times < length; times++) {
      slug += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    //const check = await supabase.from("slugs").select("*").eq("slug", slug);
    const check = await p`
      select * from slugs
      where slug = ${slug}
    `
    if (check.length === 0) {
      return slug;
    } else {
      slug += characters.charAt(Math.floor(Math.random() * characters.length));
      //const check2 = await supabase.from("slugs").select().eq("slug", "abc");
      const check2 = await p`
      select * from slugs
      where slug = ${slug}
      `
      if (check2.length === 0) {
        return slug;
      }
    }
  } catch (e) {
    console.log(e);
    return e.message;
  }
}
