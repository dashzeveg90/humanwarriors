import { notFound } from "next/navigation";
import { createClient } from "../../../../../../lib/supabase/server";
import { updateNews } from "../../../../actions";
import NewsForm from "../../news-form";

export default async function EditNewsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Edit News</h1>
          <p>{item.title}</p>
        </div>
      </div>
      <NewsForm
        action={updateNews.bind(null, id)}
        initial={{
          tag: item.tag,
          date: item.date,
          title: item.title,
          excerpt: item.excerpt,
          body: item.body ?? "",
          img: item.img ?? "",
          featured: item.featured,
        }}
        submitLabel="Save Changes"
      />
    </>
  );
}
