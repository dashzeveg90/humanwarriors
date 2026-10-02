import { createNews } from "../../../actions";
import NewsForm from "../news-form";

export default function NewNewsPage() {
  const today = new Date().toISOString().slice(0, 10);

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Add News</h1>
          <p>This will appear on both the Warriors and Divas sites.</p>
        </div>
      </div>
      <NewsForm
        action={createNews}
        initial={{ date: today }}
        submitLabel="Publish"
      />
    </>
  );
}
