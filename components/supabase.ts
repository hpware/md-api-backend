import * as db from "@supabase/supabase-js";
const supabase = db.createClient(
  process.env.supabase_domain,
  process.env.supabase_key,
);
export default supabase;
