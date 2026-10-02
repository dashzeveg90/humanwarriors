import { notFound } from "next/navigation";
import { getPlayerById } from "../../../../../../lib/data";
import { updatePlayer } from "../../../../actions";
import PlayerForm from "../../player-form";

export default async function EditPlayerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const player = await getPlayerById(id);

  if (!player) notFound();

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Edit Player</h1>
          <p>{player.name}</p>
        </div>
      </div>
      <PlayerForm
        action={updatePlayer.bind(null, id)}
        initial={{
          team: player.team,
          num: player.num,
          name: player.name,
          pos: player.pos,
          short: player.short,
          h: player.h,
          w: player.w,
          age: player.age,
          home: player.home,
          ppg: player.ppg,
          rpg: player.rpg,
          apg: player.apg,
          fg: player.fg,
          bio: player.bio,
          sortOrder: player.sortOrder,
          img: player.img,
        }}
        submitLabel="Save Changes"
      />
    </>
  );
}
