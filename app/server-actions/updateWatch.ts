"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function updateWatch(formData: FormData) {
  const id = formData.get("id");
  const model = formData.get("model");
  const brand = formData.get("brand");

  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const user = session?.user;

  if (!user) {
    console.error("User is not autenticated within updateWatch server action");
    return;
  }

  const { error } = await supabase
    .from("watches")
    .update({
      model,
      brand,
      user_id: user.id,
    })
    .match({ id, user_id: user.id });

  if (error) {
    console.error("Error updating data", error);
    return;
  }
  revalidatePath("/watch-list");

  return { message: "Success" };
}
