import { createClient } from "@supabase/supabase-js";
import { College } from "../../types/College";
import { BasicCollege } from "../../types/BasicCollege";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TABLE_NAME = "colleges";

export async function getAllColleges(): Promise<BasicCollege[]> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("id, name, city, state, enrolled, acceptance_rate, image_url")
    .order("custom_order", { ascending: true, nullsFirst: false });
  if (error) {
    console.error("Error fetching colleges:", error);
    return [];
  }

  return data as BasicCollege[];
}

export async function getCollege(id: number): Promise<College | null> {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching college:", error);
    return null;
  }

  if (!data) {
    console.log("No such document!");
    return null;
  }

  data.revenue_priv = Math.abs(data.revenue_priv);
  data.revenue_pub = Math.abs(data.revenue_pub);
  return data as College;
}
