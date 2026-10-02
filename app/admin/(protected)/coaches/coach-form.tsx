"use client";

import { useActionState } from "react";

type FormState = { error: string } | undefined;

export type CoachFormValues = {
  team: "warriors" | "divas";
  name: string;
  role: string;
  initials: string;
  bio: string;
  sortOrder: number | string;
  img: string | null;
};

export default function CoachForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initial?: Partial<CoachFormValues>;
  submitLabel?: string;
}) {
  const [state, formAction, pending] = useActionState(action, undefined);

  return (
    <form action={formAction} className="admin-form">
      {state?.error && <p className="admin-error">{state.error}</p>}

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="team">Team</label>
          <select id="team" name="team" defaultValue={initial?.team} required>
            <option value="warriors">Human Warriors</option>
            <option value="divas">Human Divas</option>
          </select>
        </div>
        <div className="admin-field">
          <label htmlFor="role">Role</label>
          <input
            id="role"
            name="role"
            defaultValue={initial?.role}
            placeholder="Head Coach, Assistant Coach…"
            required
          />
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            defaultValue={initial?.name}
            placeholder="Coach B. Ganbaatar"
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="initials">Initials</label>
          <input
            id="initials"
            name="initials"
            defaultValue={initial?.initials}
            placeholder="BG"
            maxLength={3}
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" defaultValue={initial?.bio} required />
      </div>

      <div className="admin-field">
        <label htmlFor="image">Photo (optional, falls back to initials)</label>
        {initial?.img && (
          <div className="admin-image-preview">
            <img src={initial.img} alt="" />
          </div>
        )}
        <input id="image" name="image" type="file" accept="image/*" />
        <input type="hidden" name="current_img" value={initial?.img ?? ""} />
        {initial?.img && (
          <div className="admin-field admin-field-check">
            <input id="remove_image" name="remove_image" type="checkbox" />
            <label htmlFor="remove_image">Remove current photo</label>
          </div>
        )}
      </div>

      <div className="admin-field">
        <label htmlFor="sort_order">Sort Order (lower shows first)</label>
        <input
          id="sort_order"
          name="sort_order"
          type="number"
          defaultValue={initial?.sortOrder ?? 0}
        />
      </div>

      <div className="admin-actions">
        <button
          type="submit"
          className="admin-btn admin-btn-solid"
          disabled={pending}
        >
          {pending ? "Saving…" : submitLabel}
        </button>
      </div>
    </form>
  );
}
