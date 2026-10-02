import { createPlayer } from "../../../actions";
import PlayerForm from "../player-form";

export default function NewPlayerPage() {
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Add Player</h1>
        </div>
      </div>
      <PlayerForm action={createPlayer} submitLabel="Add Player" />
    </>
  );
}
