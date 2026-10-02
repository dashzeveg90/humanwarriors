import { createCoach } from "../../../actions";
import CoachForm from "../coach-form";

export default function NewCoachPage() {
  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Add Coach</h1>
        </div>
      </div>
      <CoachForm action={createCoach} submitLabel="Add Coach" />
    </>
  );
}
