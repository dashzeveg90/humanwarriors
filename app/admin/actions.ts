"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "../../lib/supabase/server";
import { requireUser } from "../../lib/admin";
import type { Team } from "../../lib/types";

type FormState = { error: string } | undefined;

export async function signIn(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

function revalidateSite() {
  revalidatePath("/");
  revalidatePath("/divas");
}

function str(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function num(formData: FormData, key: string) {
  const value = Number(formData.get(key));
  return Number.isFinite(value) ? value : 0;
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

async function uploadImage(
  supabase: Awaited<ReturnType<typeof createClient>>,
  file: File,
  folder: string,
): Promise<string> {
  if (file.size > MAX_IMAGE_BYTES) {
    throw new Error("Image is too large (max 5MB).");
  }

  const ext = file.name.includes(".") ? file.name.split(".").pop() : "jpg";
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;

  const { error } = await supabase.storage
    .from("site-images")
    .upload(path, file, { contentType: file.type || undefined });

  if (error) throw error;

  const {
    data: { publicUrl },
  } = supabase.storage.from("site-images").getPublicUrl(path);

  return publicUrl;
}

// ---------------------------------------------------------------------
// News
// ---------------------------------------------------------------------

export async function createNews(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const supabase = await createClient();

  let img: string | null = null;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      img = await uploadImage(supabase, file, "news");
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Image upload failed",
      };
    }
  }

  const { error } = await supabase.from("news").insert({
    featured: formData.get("featured") === "on",
    tag: str(formData, "tag"),
    date: str(formData, "date"),
    title: str(formData, "title"),
    excerpt: str(formData, "excerpt"),
    body: str(formData, "body") || null,
    img,
  });

  if (error) return { error: error.message };

  revalidateSite();
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function updateNews(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const supabase = await createClient();

  let img = str(formData, "current_img") || null;
  if (formData.get("remove_image") === "on") {
    img = null;
  }

  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      img = await uploadImage(supabase, file, "news");
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Image upload failed",
      };
    }
  }

  const { error } = await supabase
    .from("news")
    .update({
      featured: formData.get("featured") === "on",
      tag: str(formData, "tag"),
      date: str(formData, "date"),
      title: str(formData, "title"),
      excerpt: str(formData, "excerpt"),
      body: str(formData, "body") || null,
      img,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateSite();
  revalidatePath("/admin/news");
  redirect("/admin/news");
}

export async function deleteNews(id: string) {
  await requireUser();
  const supabase = await createClient();
  await supabase.from("news").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/news");
}

// ---------------------------------------------------------------------
// Players
// ---------------------------------------------------------------------

export async function createPlayer(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const supabase = await createClient();

  let img: string | null = null;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      img = await uploadImage(supabase, file, "players");
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Image upload failed",
      };
    }
  }

  const { error } = await supabase.from("players").insert({
    team: str(formData, "team") as Team,
    num: num(formData, "num"),
    name: str(formData, "name"),
    pos: str(formData, "pos"),
    short: str(formData, "short"),
    h: num(formData, "h"),
    w: num(formData, "w"),
    age: num(formData, "age"),
    home: str(formData, "home"),
    ppg: num(formData, "ppg"),
    rpg: num(formData, "rpg"),
    apg: num(formData, "apg"),
    fg: num(formData, "fg"),
    bio: str(formData, "bio"),
    sort_order: num(formData, "sort_order"),
    img,
  });

  if (error) return { error: error.message };

  revalidateSite();
  revalidatePath("/admin/players");
  redirect("/admin/players");
}

export async function updatePlayer(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const supabase = await createClient();

  let img = str(formData, "current_img") || null;
  if (formData.get("remove_image") === "on") {
    img = null;
  }

  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      img = await uploadImage(supabase, file, "players");
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Image upload failed",
      };
    }
  }

  const { error } = await supabase
    .from("players")
    .update({
      team: str(formData, "team") as Team,
      num: num(formData, "num"),
      name: str(formData, "name"),
      pos: str(formData, "pos"),
      short: str(formData, "short"),
      h: num(formData, "h"),
      w: num(formData, "w"),
      age: num(formData, "age"),
      home: str(formData, "home"),
      ppg: num(formData, "ppg"),
      rpg: num(formData, "rpg"),
      apg: num(formData, "apg"),
      fg: num(formData, "fg"),
      bio: str(formData, "bio"),
      sort_order: num(formData, "sort_order"),
      img,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateSite();
  revalidatePath("/admin/players");
  redirect("/admin/players");
}

export async function deletePlayer(id: string) {
  await requireUser();
  const supabase = await createClient();
  await supabase.from("players").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/players");
}

// ---------------------------------------------------------------------
// Coaches
// ---------------------------------------------------------------------

export async function createCoach(
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const supabase = await createClient();

  let img: string | null = null;
  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      img = await uploadImage(supabase, file, "coaches");
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Image upload failed",
      };
    }
  }

  const { error } = await supabase.from("coaches").insert({
    team: str(formData, "team") as Team,
    name: str(formData, "name"),
    role: str(formData, "role"),
    initials: str(formData, "initials"),
    bio: str(formData, "bio"),
    sort_order: num(formData, "sort_order"),
    img,
  });

  if (error) return { error: error.message };

  revalidateSite();
  revalidatePath("/admin/coaches");
  redirect("/admin/coaches");
}

export async function updateCoach(
  id: string,
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  await requireUser();
  const supabase = await createClient();

  let img = str(formData, "current_img") || null;
  if (formData.get("remove_image") === "on") {
    img = null;
  }

  const file = formData.get("image");
  if (file instanceof File && file.size > 0) {
    try {
      img = await uploadImage(supabase, file, "coaches");
    } catch (err) {
      return {
        error: err instanceof Error ? err.message : "Image upload failed",
      };
    }
  }

  const { error } = await supabase
    .from("coaches")
    .update({
      team: str(formData, "team") as Team,
      name: str(formData, "name"),
      role: str(formData, "role"),
      initials: str(formData, "initials"),
      bio: str(formData, "bio"),
      sort_order: num(formData, "sort_order"),
      img,
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidateSite();
  revalidatePath("/admin/coaches");
  redirect("/admin/coaches");
}

export async function deleteCoach(id: string) {
  await requireUser();
  const supabase = await createClient();
  await supabase.from("coaches").delete().eq("id", id);
  revalidateSite();
  revalidatePath("/admin/coaches");
}
