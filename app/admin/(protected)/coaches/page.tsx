import Link from "next/link";
import { getCoaches } from "../../../../lib/data";
import { deleteCoach } from "../../actions";
import ConfirmDeleteButton from "../../confirm-delete-button";

export default async function AdminCoachesPage() {
  const [warriors, divas] = await Promise.all([
    getCoaches("warriors"),
    getCoaches("divas"),
  ]);
  const coaches = [...warriors, ...divas];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Coaches</h1>
          <p>Warriors and Divas coaching staffs.</p>
        </div>
        <Link href="/admin/coaches/new" className="admin-btn admin-btn-solid">
          Add Coach
        </Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>Name</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.id}>
                <td>{coach.team === "warriors" ? "Warriors" : "Divas"}</td>
                <td className="wrap-col">{coach.name}</td>
                <td>{coach.role}</td>
                <td>
                  <div className="admin-row-actions">
                    <Link
                      href={`/admin/coaches/${coach.id}/edit`}
                      className="admin-btn"
                    >
                      Edit
                    </Link>
                    <form action={deleteCoach.bind(null, coach.id)}>
                      <ConfirmDeleteButton
                        confirmText={`Delete ${coach.name}?`}
                      />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {coaches.length === 0 && (
              <tr>
                <td colSpan={4}>No coaches yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
