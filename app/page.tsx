import { createClient } from "@/utils/supabase/server";

export default async function Index() {
  const supabase = createClient();
  const { data: college } = await supabase
    .from("colleges")
    .select("name, id, state, city")
    .eq("name", "University of Maryland-College Park");

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {JSON.stringify(college, null, 2)}
    </div>
  );
}
