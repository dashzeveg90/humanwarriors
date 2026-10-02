import { notFound } from "next/navigation";
import { getCoachById } from "../../../../../../lib/data";
import { updateCoach } from "../../../../actions";
import CoachForm from "../../coach-form";

export default async function EditCoachPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const coach = await getCoachById(id);

  if (!coach) notFound();

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Edit Coach</h1>
          <p>{coach.name}</p>
        </div>
      </div>
      <CoachForm
        action={updateCoach.bind(null, id)}
        initial={{
          team: coach.team,
          name: coach.name,
          role: coach.role,
          initials: coach.initials,
          bio: coach.bio,
          sortOrder: coach.sortOrder,
          img: coach.img,
        }}
        submitLabel="Save Changes"
      />
    </>
  );
}
