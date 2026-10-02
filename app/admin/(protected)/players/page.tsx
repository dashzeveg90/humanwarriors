import Link from "next/link";
import { getPlayers } from "../../../../lib/data";
import { deletePlayer } from "../../actions";
import ConfirmDeleteButton from "../../confirm-delete-button";

export default async function AdminPlayersPage() {
  const [warriors, divas] = await Promise.all([
    getPlayers("warriors"),
    getPlayers("divas"),
  ]);
  const players = [...warriors, ...divas];

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Players</h1>
          <p>Warriors and Divas rosters.</p>
        </div>
        <Link href="/admin/players/new" className="admin-btn admin-btn-solid">
          Add Player
        </Link>
      </div>
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Team</th>
              <th>#</th>
              <th>Name</th>
              <th>Pos</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player.id}>
                <td>{player.team === "warriors" ? "Warriors" : "Divas"}</td>
                <td>{player.num}</td>
                <td className="wrap-col">{player.name}</td>
                <td>{player.pos}</td>
                <td>
                  <div className="admin-row-actions">
                    <Link
                      href={`/admin/players/${player.id}/edit`}
                      className="admin-btn"
                    >
                      Edit
                    </Link>
                    <form action={deletePlayer.bind(null, player.id)}>
                      <ConfirmDeleteButton
                        confirmText={`Delete ${player.name}?`}
                      />
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {players.length === 0 && (
              <tr>
                <td colSpan={5}>No players yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
