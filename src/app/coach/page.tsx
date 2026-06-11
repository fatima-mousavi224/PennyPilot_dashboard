import { createClient } from "@/utils/server";
import CoachClient from "@/components/coach/CoachClient";
import { redirect } from "next/navigation";

export default async function CoachPage() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("ai_coaching")
    .select("*")
    .eq("user_id", user.id) 
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return <CoachClient initialData={data} />;
}