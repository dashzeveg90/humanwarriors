import Link from "next/link";
import { getPlayerPopupEnabled, getPlayers } from "../../../../lib/data";
import { deletePlayer, setPlayerPopup } from "../../actions";
import ConfirmDeleteButton from "../../confirm-delete-button";
import type { Team } from "../../../../lib/types";

export default async function AdminPlayersPage() {
  const [warriors, divas, warriorsPopup, divasPopup] = await Promise.all([
    getPlayers("warriors"),
    getPlayers("divas"),
    getPlayerPopupEnabled("warriors"),
    getPlayerPopupEnabled("divas"),
  ]);
  const players = [...warriors, ...divas];
  const popupSettings: [Team, string, boolean][] = [
    ["warriors", "Human Warriors", warriorsPopup],
    ["divas", "Human Divas", divasPopup],
  ];

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
      <div className="admin-settings">
        <h2>Player detail pop-up</h2>
        <p>
          When off, clicking a player card on the website does nothing — the
          roster still shows, but the detail pop-up won&apos;t open.
        </p>
        <div className="admin-settings-rows">
          {popupSettings.map(([team, label, enabled]) => (
            <form
              key={team}
              action={setPlayerPopup.bind(null, team, !enabled)}
              className="admin-settings-row"
            >
              <span>{label}</span>
              <span className={`admin-status ${enabled ? "on" : "off"}`}>
                {enabled ? "On" : "Off"}
              </span>
              <button type="submit" className="admin-btn">
                {enabled ? "Turn off" : "Turn on"}
              </button>
            </form>
          ))}
        </div>
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
