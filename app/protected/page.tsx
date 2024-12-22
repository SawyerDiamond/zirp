import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Home } from "./Home";

export default async function HomeClient() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <div className="m-4">
      <Home />
    </div>
  );
}
