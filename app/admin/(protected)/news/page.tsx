import Link from "next/link";
import { getNews } from "../../../../lib/data";
import { deleteNews } from "../../actions";
import ConfirmDeleteButton from "../../confirm-delete-button";

export default async function AdminNewsPage() {
  const news = await getNews();

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>News</h1>
          <p>Shown identically on both the Warriors and Divas sites.</p>
        </div>
        <Link href="/admin/news/new" className="admin-btn admin-btn-solid">
          Add News
        </Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Tag</th>
              <th>Title</th>
              <th>Featured</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {news.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.tag}</td>
                <td className="wrap-col">{item.title}</td>
                <td>{item.featured ? "Yes" : ""}</td>
                <td>
                  <div className="admin-row-actions">
                    <Link
                      href={`/admin/news/${item.id}/edit`}
                      className="admin-btn"
                    >
                      Edit
                    </Link>
                    <form action={deleteNews.bind(null, item.id)}>
                      <ConfirmDeleteButton
                        confirmText={`Delete "${item.title}"?`}
                      />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {news.length === 0 && (
              <tr>
                <td colSpan={5}>No news yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
