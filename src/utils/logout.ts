import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function handleLogout() {
  "use server";
  const cookieStore = cookies();
  cookieStore.set("token", "", { maxAge: 0, path: "/" });
  revalidatePath("/");
  redirect("/");
}