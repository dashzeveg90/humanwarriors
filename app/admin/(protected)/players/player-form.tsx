"use client";

import { useActionState } from "react";

type FormState = { error: string } | undefined;

export type PlayerFormValues = {
  team: "warriors" | "divas";
  num: number | string;
  name: string;
  pos: string;
  short: string;
  h: number | string;
  w: number | string;
  age: number | string;
  home: string;
  ppg: number | string;
  rpg: number | string;
  apg: number | string;
  fg: number | string;
  bio: string;
  sortOrder: number | string;
  img: string | null;
};

export default function PlayerForm({
  action,
  initial,
  submitLabel = "Save",
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  initial?: Partial<PlayerFormValues>;
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
          <label htmlFor="num">Jersey #</label>
          <input
            id="num"
            name="num"
            type="number"
            defaultValue={initial?.num}
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" defaultValue={initial?.name} required />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="pos">Position</label>
          <input
            id="pos"
            name="pos"
            defaultValue={initial?.pos}
            placeholder="Point Guard"
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="short">Short Label</label>
          <input
            id="short"
            name="short"
            defaultValue={initial?.short}
            placeholder="PG"
            required
          />
        </div>
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="h">Height (cm)</label>
          <input
            id="h"
            name="h"
            type="number"
            defaultValue={initial?.h}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="w">Weight (kg)</label>
          <input
            id="w"
            name="w"
            type="number"
            defaultValue={initial?.w}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="age">Age</label>
          <input
            id="age"
            name="age"
            type="number"
            defaultValue={initial?.age}
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="home">Hometown</label>
        <input
          id="home"
          name="home"
          defaultValue={initial?.home}
          required
        />
      </div>

      <div className="admin-field-row">
        <div className="admin-field">
          <label htmlFor="ppg">PPG</label>
          <input
            id="ppg"
            name="ppg"
            type="number"
            step="0.1"
            defaultValue={initial?.ppg}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="rpg">RPG</label>
          <input
            id="rpg"
            name="rpg"
            type="number"
            step="0.1"
            defaultValue={initial?.rpg}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="apg">APG</label>
          <input
            id="apg"
            name="apg"
            type="number"
            step="0.1"
            defaultValue={initial?.apg}
            required
          />
        </div>
        <div className="admin-field">
          <label htmlFor="fg">FG%</label>
          <input
            id="fg"
            name="fg"
            type="number"
            step="0.1"
            defaultValue={initial?.fg}
            required
          />
        </div>
      </div>

      <div className="admin-field">
        <label htmlFor="bio">Bio</label>
        <textarea id="bio" name="bio" defaultValue={initial?.bio} required />
      </div>

      <div className="admin-field">
        <label htmlFor="image">Photo (optional)</label>
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
